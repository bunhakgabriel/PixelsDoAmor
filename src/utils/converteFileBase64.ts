export const converteFileBase64 = (e: React.ChangeEvent<HTMLInputElement>): Promise<string> => {
    return new Promise((resolve, reject) => {
        if (e.target.files && e.target.files[0]) {
            const reader = new FileReader();
            reader.onload = (event) => {
                resolve(event.target?.result as string);
            };
            reader.onerror = (error) => {
                reject(error);
            };
            reader.readAsDataURL(e.target.files[0]);
        } else {
            resolve('');
        }
    });
};
