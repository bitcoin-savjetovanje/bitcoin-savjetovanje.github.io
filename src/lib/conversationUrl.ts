import {
  isConversationTopicId,
  type ConversationTopicId,
} from "@/content/conversation"
import { CONVERSATION_PATH } from "@/content/site"

export function sanitizeConversationLocation(): ConversationTopicId | null {
  if (typeof window === "undefined") {
    return null
  }

  const currentPath = window.location.pathname
  const normalizedConversationPath = CONVERSATION_PATH.replace(/\/$/, "")

  if (
    currentPath !== CONVERSATION_PATH &&
    currentPath !== normalizedConversationPath
  ) {
    return null
  }

  const params = new URLSearchParams(window.location.search)
  const topicValue = params.get("tema")
  const topicId = isConversationTopicId(topicValue) ? topicValue : null
  const safeParams = new URLSearchParams()

  if (topicId) {
    safeParams.set("tema", topicId)
  }

  const safeQuery = safeParams.toString()
  const currentQuery = params.toString()
  const urlChanged =
    currentQuery !== safeQuery || window.location.hash.length > 0

  if (urlChanged) {
    const safeUrl = `${currentPath}${safeQuery ? `?${safeQuery}` : ""}`

    window.history.replaceState(window.history.state, "", safeUrl)
  }

  return topicId
}
