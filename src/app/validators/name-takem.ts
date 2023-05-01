import { AbstractControl } from "@angular/forms";

export function startWithNumber(control: AbstractControl) {
    console.log('control.value[0]:', control.value[0])
    if (!isNaN(control.value[0])) {
        return { startWithNumber: true }
    } else {
        return null
    }


}

export function nameTaken(control: AbstractControl) {

    return new Promise(resolve => {
        setTimeout(() => {
            if (control.value === 'momo') {
                resolve({ nameTaken: true })
            } else {
                resolve(null)
            }
        }, 1000);
    })

}