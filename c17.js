class mesinHitung{
    constructor(){
        this.num = 1;
        this.x = 7
        this.add = (num) => {
            this.num += num
            return this;
        };
        this.substract = (num) => {
            this.num -= num
            return this;
        }
        this.devide = () => {
            this.num /= num
            return this;
        }
        this.multiply = () => {
            this.num *= num
            return this;
        }
        this.grade = (num) => {
            this.num = Math.pow(num, 2);
            return this;
        }
        this.exponent = (num) => {
            this.num = `${this.x} pangkat ${num} = ${Math.pow(this.x, num)}`
            return this;
        }
        this.result = () => {
            console.log(this.num)
        }
    }
}
var pi = 22/7
var mh = new mesinHitung()

mh.exponent(5).result();