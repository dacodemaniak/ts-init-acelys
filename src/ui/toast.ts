export class Toast {
    private position: string = 'bottom'
    private duration: number = 5
    private action?: string

    public constructor(positionOptions: any = null) {
        if (positionOptions) {
            let me: any = this
            for (const option in positionOptions) {
               me[option] = positionOptions[option] 
            }
        }
    }

    public setPosition(position: string): void {
        this.position = position
    }

    public setDuration(duration: number): void {
        this.duration = duration
    }

    public setAction(action: string): void {
        this.action = action
    }

    public open(captionText: string, captionAction: string = null): void {
        const outerToast: HTMLDivElement = document.createElement('div')
        outerToast.style.position = 'absolute'
        outerToast.style.backgroundColor = 'transparent'
        outerToast.style.width = '100%'

        const toast: HTMLDivElement = document.createElement('div')
        toast.style.width = '25em'
        toast.style.height = '3em'
        toast.style.lineHeight = '3em'
        toast.style.verticalAlign = 'middle'
        toast.style.color = 'rgb(255, 255, 255)'
        toast.style.backgroundColor = 'rgba(200, 128, 128, .8)'

        // Determine left position
        //const leftPosition: string = (window.innerWidth - 200) + 'px'
        //console.log(`Position left: ${leftPosition} from ${window.innerWidth}`)
        //toast.style.left = leftPosition
        toast.style.margin = '0 auto';

        if (this.position === 'top') {
            outerToast.style.top = '3em'
        }

        if (this.position === 'bottom') {
            outerToast.style.bottom = '3em'
        }

        const captionFlex: HTMLSpanElement = document.createElement('span')
        captionFlex.textContent = captionText

        toast.appendChild(captionFlex)

        outerToast.appendChild(toast)

        document.querySelector('body').appendChild(outerToast)

        setTimeout(
            () => document.querySelector('body').removeChild(outerToast),
            this.duration * 1000
        )
    }
}