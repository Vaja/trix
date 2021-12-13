/* eslint-disable
    no-this-before-super,
*/
// TODO: This file was created by bulk-decaffeinate.
// Fix any style issues and re-enable lint.
/*
 * decaffeinate suggestions:
 * DS002: Fix invalid constructor
 * DS102: Remove unnecessary code created because of implicit returns
 * DS206: Consider reworking classes to avoid initClass
 * Full docs: https://github.com/decaffeinate/decaffeinate/blob/master/docs/suggestions.md
 */
import View from "inspector/view"

import { handleEvent } from "trix/core/helpers"

class DebugView extends View {
  static initClass() {
    this.prototype.title = "Debug"
    this.prototype.template = "debug"
  }

  constructor() {
    this.didToggleViewCaching = this.didToggleViewCaching.bind(this)
    this.didClickRenderButton = this.didClickRenderButton.bind(this)
    this.didClickParseButton = this.didClickParseButton.bind(this)
    this.didToggleControlElement = this.didToggleControlElement.bind(this)
    super(...arguments)
    handleEvent("change", {
      onElement: this.element,
      matchingSelector: "input[name=viewCaching]",
      withCallback: this.didToggleViewCaching,
    })
    handleEvent("click", {
      onElement: this.element,
      matchingSelector: "button[data-action=render]",
      withCallback: this.didClickRenderButton,
    })
    handleEvent("click", {
      onElement: this.element,
      matchingSelector: "button[data-action=parse]",
      withCallback: this.didClickParseButton,
    })
    handleEvent("change", {
      onElement: this.element,
      matchingSelector: "input[name=controlElement]",
      withCallback: this.didToggleControlElement,
    })
  }

  didToggleViewCaching({ target }) {
    if (target.checked) {
      return this.compositionController.enableViewCaching()
    } else {
      return this.compositionController.disableViewCaching()
    }
  }

  didClickRenderButton() {
    return this.editorController.render()
  }

  didClickParseButton() {
    return this.editorController.reparse()
  }

  didToggleControlElement({ target }) {
    if (target.checked) {
      this.control = new Trix.Inspector.ControlElement(this.editorElement)
    } else {
      this.control?.uninstall()
      this.control = null
    }
  }
}
DebugView.initClass()

Trix.Inspector.registerView(DebugView)