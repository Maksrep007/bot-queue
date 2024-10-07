
di = [0.45 , 0.55, 0.65, 0.75, 0.85, 0.95, 1.25, 1.75, 3.0, 5.5, 8.5]

ni = [13000, 4000, 7200, 750, 49, 1, 0, 0, 0, 0, 0]
let d = 0;
let n = 0;
di.forEach(function(num) {
    d += num;
});
ni.forEach(function(num) {
    n += num;
});
let summ=0;
N = 25000

for (let i = 0; i < di.length; i++) {
    summ+= (((di[i]**3) * ni[i]) / N) ** 0.3333333
}
console.log(summ)