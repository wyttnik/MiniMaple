class MiniMaple{

    isValid(str) {
        if (str[0] !== '-' && str[0] !== '+') str = '+' + str;
        str = str.replace(/\s+/g, '');
        if (str.match(/^((\+|\-)((\d+|[a-z])(\*(\d+|[a-z])(\^\d+)?)?|[a-z]\^\d+(\*(\d+|[a-z]))?))+$/g) 
            === null) {
            throw new Error("Expression doesn't match the pattern");
        }
        this._expression = str;
        return true;
    }

    diff(str,x) {
        this.isValid(str);

        if (x === '') return '0';

        if (this._expression.indexOf(x) === -1) return '0';

        let res = '';
        const fullExpression = this._expression.match(/(\+|\-)[^+-]+/g);
        fullExpression.forEach( term => {
            term = term.replace('^1','');
            let mult1 = term.match(x+'.*(?=\\*)') ? term.match(x+'.*(?=\\*)')[0] : null;
            let mult2 = term.match('\\*'+x+'.*') ? term.match('\\*'+x+'.*')[0].slice(1) : null;
            let indPow = term.match(x+'\\^\\d+') ? term.match(x+'\\^\\d+')[0].slice(2) : null;
            // transform from x*x -> x^2 or x*x^2 -> x^3
            if (mult1 !== null && mult2 !== null) {
                if (indPow !== null) {
                    term = term[0] + x + '^' + (Number(indPow)+1);
                }
                else {
                    term = term[0] + x +'^2';
                }
                mult1 = null;
                mult2 = null;
                indPow = term.match(x+'\\^\\d+')[0].slice(2);
            }
            // transform from x*a -> a*x 
            if (mult1 !== null) {
                term = term[0] + term.match(/\*.*/)[0].slice(1) + '*' + mult1;
                mult1 = null;
                mult2 = term.match('\\*'+x+'.*')[0].slice(1);
            }

            if (indPow !== null) {
                res += term[0];
                indPow = Number(indPow);
                if (mult2 !== null) {
                    mult1 = term.match(/(\d+|[a-z])(?=\*)/)[0];
                    if (Number.isInteger(Number(mult1))) res += Number(mult1) * indPow + '*' + x;
                    else res += indPow + '*' + mult1 + '*' + x;
                    if (indPow - 1 !== 1) res += '^' + (indPow - 1);
                }
                else if (indPow - 1 !== 1) res += indPow + '*' + x + '^' + (indPow - 1);
                else res += indPow + '*' + x;
            }
            else if (mult2 !== null) res += term.match(/.*(?=\*)/)[0];
            else if (term.indexOf(x) !== -1) res += term[0] + 1;
        });
        if (res[0] === '+') return res.slice(1);
        return res;
    }
}

export {MiniMaple}