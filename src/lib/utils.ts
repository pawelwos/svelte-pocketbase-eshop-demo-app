import type { ZodSchema } from 'zod';
import z from "zod";

const { randomBytes } = await import('node:crypto');

export const getUUID = ():string => {
	return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
			var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
			return v.toString(16);
	});
}

export const generateUsername = (name:string) => {
	const id = randomBytes(2).toString('hex');
	return `${name.slice(0, 5)}${id}`;
};

export const slugify = (str: string):string => {
    str = str.replace(/^\s+|\s+$/g, ''); // trim
    str = str.toLowerCase();
  
    // remove accents, swap ñ for n, etc
    var from = "àáäâèéëêìíïîòóöôùúüûñç·/_,:;";
    var to   = "aaaaeeeeiiiioooouuuunc------";
    for (var i=0, l=from.length ; i<l ; i++) {
        str = str.replace(new RegExp(from.charAt(i), 'g'), to.charAt(i));
    }

    str = str.replace(/[^a-z0-9 -]/g, '') // remove invalid chars
        .replace(/\s+/g, '-') // collapse whitespace and replace by -
        .replace(/-+/g, '-'); // collapse dashes

    return str;
}

export const productLink = (name: string, id: number):string => {
	return "/product/"+slugify(name)+"-"+id
}

export const categoryLink = (name: string, id: number):string => {
	return "/categories/"+slugify(name)+"-"+id
}


export const validateData = async (formData:FormData, schema:ZodSchema):Promise<object>  => {
	const body = Object.fromEntries(formData);

	try {
		const data = schema.parse(body);
		return {
			formData: data,
			errors: null
		};
	} catch (err) {
		//console.log('Error: ', err);

		const errors = err instanceof z.ZodError && err.flatten() ;
		return {
			formData: body,
			errors
		};
	}
};