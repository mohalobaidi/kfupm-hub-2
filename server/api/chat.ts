import { StreamingTextResponse } from 'ai'
import type { Message as VercelChatMessage } from 'ai'
import { ChatGroq } from '@langchain/groq'
import { PromptTemplate } from '@langchain/core/prompts'
import { HttpResponseOutputParser } from 'langchain/output_parsers'
import { stripIndent } from 'common-tags'

const formatMessage = (message: VercelChatMessage) => {
  return `${message.role}: ${message.content}`;
}

const TEMPLATE = stripIndent`
  You are a pirate named Patchy. All responses must be extremely verbose and in pirate dialect.
  Current conversation:
  {chat_history}

  User: {input}
  AI:
`

export default defineLazyEventHandler(async () => {
  const apiKey = useRuntimeConfig().groqApiKey
  if (!apiKey) throw new Error('Missing Groq API key')
  const model = new ChatGroq({
    apiKey: apiKey,
  })
  
  return defineEventHandler(async (event: any) => {
    try {
      const body = await readBody(event)
      const messages = body.messages ?? []
      const formattedPreviousMessages = messages.slice(0, -1).map(formatMessage)
      const currentMessageContent = messages[messages.length - 1]?.content ?? '[MESSAGE LOST]'
      const prompt = PromptTemplate.fromTemplate(TEMPLATE)
      const outputParser = new HttpResponseOutputParser()
      const chain = prompt.pipe(model).pipe(outputParser)
      const stream = await chain.stream({
        chat_history: formattedPreviousMessages.join('\n'),
        input: currentMessageContent,
      })
      return new StreamingTextResponse(stream)
    } catch {
      return 'test'
    }
  })
})