import { QuartzComponent, QuartzComponentConstructor, QuartzComponentProps } from "./types"
import { classNames } from "../util/lang"
// @ts-ignore
import script from "./scripts/comment-relay.inline"
// @ts-ignore
import styles from "./styles/comment-relay.scss"

type Options = {
  relayPort?: number
  hotkey?: string
}

export default ((opts?: Options) => {
  const CommentRelay: QuartzComponent = ({
    displayClass,
    fileData,
  }: QuartzComponentProps) => {
    const port = opts?.relayPort ?? 3333
    const hotkey = opts?.hotkey ?? "c"

    return (
      <div
        class={classNames(displayClass, "comment-relay")}
        data-relay-port={port}
        data-hotkey={hotkey}
        data-page-slug={fileData.slug ?? ""}
      >
        <div class="comment-overlay hidden">
          <div class="comment-box">
            <div class="comment-header">
              <span class="comment-title">💬 Comment to OpenCode</span>
              <span class="comment-page-label"></span>
              <button class="comment-close" aria-label="Close">×</button>
            </div>
            <textarea
              class="comment-input"
              placeholder="Type your comment... (Enter to send, Shift+Enter for newline, Esc to close)"
              rows={4}
            ></textarea>
            <div class="comment-footer">
              <span class="comment-status"></span>
              <button class="comment-send">Send ⏎</button>
            </div>
          </div>
        </div>
      </div>
    )
  }

  CommentRelay.afterDOMLoaded = script
  CommentRelay.css = styles

  return CommentRelay
}) satisfies QuartzComponentConstructor<Options>
