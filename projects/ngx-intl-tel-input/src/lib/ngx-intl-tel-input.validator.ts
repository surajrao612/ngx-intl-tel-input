import { FormControl } from '@angular/forms';
import * as lpn from 'google-libphonenumber';

export const phoneNumberValidator = (control: FormControl) => {
	const id = control.value && control.value.id ? control.value.id : 'phone';
	const el = document.getElementById(id) ? document.getElementById(id) : undefined;
	if (el) {
		const isCheckValidation = el.getAttribute('validation');
		if (isCheckValidation === 'true') {
			const isRequired = control.errors && control.errors.required === true;
			const error = { validatePhoneNumber: { valid: false } };
			let number: lpn.PhoneNumber;

			try {
				number = lpn.PhoneNumberUtil.getInstance().parse(control.value.number, control.value.countryCode);
			} catch (e) {
				if (isRequired === true) { return error; }
			}

			if (control.value) {
				if (!number) {
					return error;
				} else {
					if (!lpn.PhoneNumberUtil.getInstance().isValidNumberForRegion(number, control.value.countryCode)) {
						return error;
					}
				}
			}
		} else if (isCheckValidation === 'false') {
			control.clearValidators();
		}
	}
	return;

};
