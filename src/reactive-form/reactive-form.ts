export class ReactiveForm {
    public static onSubmit(event: any): void {
        event.preventDefault()
        console.log(`onSubmit was fired`)
    }
}

export const onSubmit = (event: any) => ReactiveForm.onSubmit(event)