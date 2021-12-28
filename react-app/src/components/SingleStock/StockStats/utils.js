export function formatThousands(n) {
    let s = "" + Math.floor(n),
        d = n % 1,
        i = s.length,
        r = "";
    while ((i -= 3) > 0) {
        r = "," + s.substr(i, 3) + r;
    }
    return (
        s.substr(0, i + 3) +
        r +
        (d ? "." + Math.round(d * Math.pow(10, 2)) : "")
    );
}

export function maxForBuying(buyingPower, costPerShare){
    let max = Math.floor(buyingPower / costPerShare)
    return max
} 