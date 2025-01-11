// arr is a list of characters
let arrToStr = arr => {
    let ans = [];
    for (const c of arr) {
        ans.push(c);
    }

    return ans.join("")
}

let strConcat = arr => {
    let ans = "";
    for (const c of arr) {
        ans += c;
    }

    return ans;
}