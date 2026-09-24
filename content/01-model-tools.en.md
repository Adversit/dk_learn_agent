# Part 01: Tools for the Model

## 1. Why do we need tools?

I once asked ChatGPT how to configure a static IP address on a server. The process was almost always the same: **it gave me commands, I ran them, pasted the results back, and let it decide what to do next.**

I was doing a lot of mechanical execution and copying. Could the LLM receive the results directly and continue the task, without having me relay every step?

This is how I understand giving a chat model “hands”: **tools**. Codex can already read files, edit code, and run commands. The model does not execute the code itself: it requests a tool call, the runtime executes it, and the result goes back to the model. ([OpenAI Developers](https://developers.openai.com/codex/cli/))

But being able to execute and executing reliably are different. Even the three most basic tools raise questions: how much of a huge log should Read load at once? What should Edit do if a file has changed since it was read? How should Bash avoid dangerous actions such as accidentally deleting files?

So **a tool can start as a function, but reliable tool design also includes constraints on its execution.** We do not need to implement every constraint immediately. We can start small and add them as we encounter problems.

## 2. What is a tool? Four official descriptions

*These are paraphrases of the main points in the official documentation, not direct quotations.*

| Source | Description of tools |
| --- | --- |
| **Anthropic / Claude** | A model can call developer-defined or platform-provided functionality. It produces a structured call that the application or platform executes. ([Claude Platform](https://platform.claude.com/docs/en/agents-and-tools/tool-use/overview)) |
| **OpenAI** | A tool is a capability available to the model; a tool call is a request to use that capability; a tool result is information returned to the model after execution. ([OpenAI Developers](https://developers.openai.com/api/docs/guides/function-calling)) |
| **LangChain** | A tool is a callable function with defined inputs and outputs. The model uses the context to decide when to call it and which arguments to supply. ([Docs by LangChain](https://docs.langchain.com/oss/python/langchain/tools)) |
| **Google ADK** | A tool gives an Agent a specific capability to act and interact with environments beyond text generation and reasoning. ([Google ADK](https://google.github.io/adk-docs/tools-custom/)) |

## 3. Starting with Read: our exploration path

We will use **Claude Code's publicly documented tool behavior as a reference** to build minimal versions of Read, Edit, and Bash ourselves. We will start with Read and work through the following questions gradually.

| Step | Question to explore |
| --- | --- |
| **① Core function** | Start with a function that reads a small test file: given its path, how do we obtain its contents? |
| **② Reading limits** | What if the file is too large? Gradually add a starting line, a line count, and a content limit, and tell the model whether it received the entire file. Claude Code's Read offers `offset`, `limit`, and partial-read notices as references. ([Claude](https://code.claude.com/docs/en/tools-reference)) |
| **③ Model integration** | How do the name, description, and parameter definitions teach the model to use Read? Once the model requests a call, how does the program locate and execute the function? ([Claude Platform](https://platform.claude.com/docs/en/agents-and-tools/tool-use/implement-tool-use)) |
| **④ Before execution** | Are the arguments valid, and is access to the path allowed? Which checks belong to the tool itself, and which could be added through a `PreToolUse` hook? ([Claude](https://code.claude.com/docs/en/hooks)) |
| **⑤ After execution** | Is the output too long, and does it need redaction? How can output processing or a `PostToolUse` hook give the model an appropriate result? ([Claude](https://code.claude.com/docs/en/hooks)) |
| **⑥ Failure feedback** | When a file is missing, access is denied, or execution fails, what should the model receive so it can adjust, and what should the program handle? ([Claude Platform](https://platform.claude.com/docs/en/agents-and-tools/tool-use/handle-tool-calls)) |

### Two boundaries to establish first

**Pre-validation is not the same as a hook.** Argument validation, tool constraints, permission control, and hooks are different mechanisms. A hook is an extension point for adding logic at a particular time, not a general name for every check. An after-execution hook is not an undo button: it can process results or provide feedback, but it cannot reverse a file change or command that has already executed. ([Claude](https://code.claude.com/docs/en/hooks))

**Not every raw error should be passed to the LLM.** For our own minimal implementation, we can begin with this division:

- **Errors requiring the model to change its action:** for example, a missing path or an invalid read range. Return a clear reason and a possible next step. A permission denial can be reported, but the model must not be guided to bypass it. The official tool protocol supports returning a failure as a tool result. ([Claude Platform](https://platform.claude.com/docs/en/agents-and-tools/tool-use/handle-tool-calls))
- **Failures the runtime should handle:** for network or rate-limit issues in remote tools, the program first applies a bounded retry policy and returns a summary if it still fails. This minimal local-file Read tool does not introduce networking. **A failed request to the model API must not be reported as a Read execution failure.**
- **Information that should not be exposed directly:** keys, credentials, and unrelated internal details should be omitted. Keep the necessary failure reason so the model does not mistake failure for success. Redaction is our own design requirement here and cannot rely on a prompt alone.
