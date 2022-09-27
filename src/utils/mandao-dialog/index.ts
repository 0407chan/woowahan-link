import Mustache from 'mustache'
import './style.scss'
import { template as modalTemplate } from './template'

type MandaoDialogOptions = {
  label?: {
    confirmLabel?: string
    cancelLabel?: string
    closeLabel?: string
  }
}

export default class MandaoDialog {
  static alertsOrConfirms: number[] = []

  private index = 0

  private dialogContainerElm: HTMLElement

  private confirmBtn: HTMLElement

  private cancelBtn: HTMLElement

  private closeBtn: HTMLElement

  constructor(options?: MandaoDialogOptions) {
    // create a DOM
    const wrapper = document.createElement('div')
    wrapper.innerHTML = Mustache.render(modalTemplate, {
      confirmLabel: '확인',
      cancelLabel: '취소',
      closeLabel: '닫기',
      ...options?.label
    })
    this.dialogContainerElm = wrapper.firstElementChild as HTMLElement
    document.body.appendChild(this.dialogContainerElm)
    // eslint-disable-next-line no-unused-expressions
    this.dialogContainerElm.getBoundingClientRect().width

    this.confirmBtn = this.dialogContainerElm.querySelector(
      '.actions .confirm'
    ) as HTMLElement
    this.cancelBtn = this.dialogContainerElm.querySelector(
      '.actions .cancel'
    ) as HTMLElement
    this.closeBtn = this.dialogContainerElm.querySelector(
      '.actions .close'
    ) as HTMLElement
  }

  public alert(msg: string): Promise<unknown> {
    this.index = MandaoDialog.alertsOrConfirms.push(0) - 1

    this.setMsg(msg)
    this.open('alert')

    return new Promise((resolve) => {
      this.closeBtn.onclick = () => {
        this.close()
        resolve(true)
      }
    })
  }

  public confirm(msg: string, submsg?: string): Promise<boolean> {
    this.index = MandaoDialog.alertsOrConfirms.push(0) - 1

    this.setMsg(msg)
    this.setSubMsg(submsg)
    this.open('confirm')

    return new Promise<boolean>((resolve) => {
      this.confirmBtn.onclick = () => {
        this.close()
        resolve(true)
      }

      this.cancelBtn.onclick = () => {
        this.close()
        resolve(false)
      }
    })
  }

  public vagabond(msg: string): void {
    this.setMsg(msg)
    this.open('vagabond')
  }

  private setMsg(msg: string): void {
    // eslint-disable-next-line operator-linebreak
    this.dialogContainerElm.getElementsByClassName('message')[0].innerHTML =
      msg.replace(/(?:\r\n|\r|\n)/g, '<br>')
  }

  private setSubMsg(msg?: string): void {
    // eslint-disable-next-line operator-linebreak
    const subMessageElm =
      this.dialogContainerElm.getElementsByClassName('sub-message')[0]

    if (msg) {
      subMessageElm.innerHTML = msg.replace(/(?:\r\n|\r|\n)/g, '<br>')
    } else {
      subMessageElm.remove()
    }
  }

  private open(mode: 'alert' | 'confirm' | 'vagabond') {
    // eslint-disable-next-line no-extra-semi
    ;(document.activeElement as HTMLElement)?.blur()

    setTimeout(() => {
      this.dialogContainerElm.ontransitionstart = () => {
        if (mode === 'alert') {
          this.closeBtn.querySelector('button')?.focus()
        } else if (mode === 'confirm') {
          this.confirmBtn.querySelector('button')?.focus()
        }
      }

      this.dialogContainerElm.classList.add('active')
      this.dialogContainerElm.classList.add(mode)
    }, 0)

    // If vagabond mode, auto-close it after some time
    if (mode === 'vagabond') {
      setTimeout(() => {
        this.close()
      }, 1500)
    }
  }

  private close() {
    MandaoDialog.alertsOrConfirms.splice(this.index, 1)

    // Remove active class
    this.dialogContainerElm.classList.add('closing')

    // Delete DOM after transition
    setTimeout(() => {
      this.dialogContainerElm.remove()
    }, 300)
  }
}

MandaoDialog.alertsOrConfirms = []

export function Dialog(options?: MandaoDialogOptions): MandaoDialog {
  return new MandaoDialog(options)
}
