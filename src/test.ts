const fibonacci = (n: number) => {
    let test = 0;

    for (let i = 0; i < n; i++) {
        test += i;
    }

    return test;
};


export {
    fibonacci
}

