import { check, Match } from 'meteor/check';
import { perfil } from '../../../both/collections.js';

export default class PerfilClass {
    constructor(name) {
        check(name, String);
        const perfilInstance = perfil.findOne({ _id: name }, { reactive: false });
        check(perfilInstance, {
            _id: String,
            d: Match.OneOf(Number, null),
            bf: Match.OneOf(Number, null),
            tw: Match.OneOf(Number, null),
            tf: Match.OneOf(Number, null),
            r: Match.OneOf(Number, null),
            K: Match.OneOf(Number, null),
            Area: Match.OneOf(Number, null),
            Peso: Match.OneOf(Number, null),
            Ix: Match.OneOf(Number, null),
            Sx: Match.OneOf(Number, null),
            rx: Match.OneOf(Number, null),
            Iy: Match.OneOf(Number, null),
            Sy: Match.OneOf(Number, null),
            ry: Match.OneOf(Number, null),
            Zx: Match.OneOf(Number, null),
            Zy: Match.OneOf(Number, null),
            h: Match.OneOf(Number, null)
        });
        this.name = perfilInstance._id;
        this.d = perfilInstance.d;
        this.bf = perfilInstance.bf;
        this.tw = perfilInstance.tw;
        this.tf = perfilInstance.tf;
        this.r = perfilInstance.r;
        this.K = perfilInstance.K;
        this.Area = perfilInstance.Area;
        this.Peso = perfilInstance.Peso;
        this.Ix = perfilInstance.Ix;
        this.Sx = perfilInstance.Sx;
        this.rx = perfilInstance.rx;
        this.Iy = perfilInstance.Iy;
        this.Sy = perfilInstance.Sy;
        this.ry = perfilInstance.ry;
        this.Zx = perfilInstance.Zx;
        this.Zy = perfilInstance.Zy;
        this.h = perfilInstance.h;
        this.z = this.tf + this.r;
    }

    /* eslint-disable class-methods-use-this */
    point0() {
        const x = 0;
        const y = 0;
        return { x, y };
    }

    /* eslint-enable class-methods-use-this */
    point1() {
        const x = this.bf;
        const y = 0;
        return { x, y };
    }

    point2() {
        const x = this.bf;
        const y = this.tf;
        return { x, y };
    }

    point3() {
        const x = (this.bf / 2) + (this.tw / 2) + this.r;
        const y = this.tf;
        return { x, y };
    }

    point4() {
        const x = (this.bf / 2) + (this.tw / 2);
        const y = this.z;
        return { x, y };
    }

    point5() {
        const x = (this.bf / 2) + (this.tw / 2);
        const y = this.d - this.z;
        return { x, y };
    }

    point6() {
        const x = (this.bf / 2) + (this.tw / 2) + this.r;
        const y = this.d - this.tf;
        return { x, y };
    }

    point7() {
        const x = this.bf;
        const y = this.d - this.tf;
        return { x, y };
    }

    point8() {
        const x = this.bf;
        const y = this.d;
        return { x, y };
    }

    point9() {
        const x = 0;
        const y = this.d;
        return { x, y };
    }

    point10() {
        const x = 0;
        const y = this.d - this.tf;
        return { x, y };
    }

    point11() {
        const x = (this.bf / 2) - (this.tw / 2) - this.r;
        const y = this.d - this.tf;
        return { x, y };
    }

    point12() {
        const x = (this.bf / 2) - (this.tw / 2);
        const y = this.d - this.z;
        return { x, y };
    }

    point13() {
        const x = (this.bf / 2) - (this.tw / 2);
        const y = this.z;
        return { x, y };
    }

    point14() {
        const x = (this.bf / 2) - (this.tw / 2) - this.r;
        const y = this.tf;
        return { x, y };
    }

    point15() {
        const x = 0;
        const y = this.tf;
        return { x, y };
    }

    // getAnyPoint(point, axis) {
    //     const validPoint = Match.Where((x) => {
    //         check(x, Number);
    //         return x >= 0 && x <= 15;
    //     });
    //     const validAxis = Match.Where((x) => {
    //         check(x, String);
    //         return x === 'x' || x === 'y';
    //     });
    //     check(point, validPoint);
    //     check(axis, validAxis);
    //     return this[`point${point}`]()[axis];
    // }

    getFileContent() {
        const point1 = this.point1();
        const point2 = this.point2();
        const point3 = this.point3();
        const point4 = this.point4();
        const point5 = this.point5();
        const point6 = this.point6();
        const point7 = this.point7();
        const point8 = this.point8();
        const point9 = this.point9();
        const point10 = this.point10();
        const point11 = this.point11();
        const point12 = this.point12();
        const point13 = this.point13();
        const point14 = this.point14();
        const point15 = this.point15();
        /* eslint-disable max-len */
        return `GRIDMODE 0
SNAPMODE 0
ORTHO OFF
ISODRAFT O
AUTOSNAP 0
OSNAP NONE
line ${point14.x},${point14.y} ${point15.x},${point15.y} 0,0 ${point1.x},${point1.y} ${point2.x},${point2.y} ${point3.x},${point3.y} 
line ${point13.x},${point13.y} ${point12.x},${point12.y} 
line ${point4.x},${point4.y} ${point5.x},${point5.y} 
line ${point6.x},${point6.y} ${point7.x},${point7.y} ${point8.x},${point8.y} ${point9.x},${point9.y} ${point10.x},${point10.y} ${point11.x},${point11.y} 
zoom w -10,-10 ${this.bf + 10},${this.d + 10}
fillet R ${this.r}  ${point3.x},${point3.y}  ${point4.x},${point4.y}  ${point5.x},${point5.y}  ${point6.x},${point6.y}  ${point11.x},${point11.y}  ${point12.x},${point12.y}  ${point13.x},${point13.y}  ${point14.x},${point14.y}
zoom 0.9x `;
        /* eslint-enable max-len */
    }

    getBlob() {
        const txt = this.getFileContent();
        const blob = new Blob([txt], {
            type: 'text/plain',
            endings: 'native'
        });
        return window.URL.createObjectURL(blob);
    }


    getSVG() {
        return {
            width: this.bf,
            heigth: this.d,
            x0: this.point0().x,
            y0: this.point0().y,
            x1: this.point1().x,
            y1: this.point1().y,
            x2: this.point2().x,
            y2: this.point2().y,
            x3: this.point3().x,
            y3: this.point3().y,
            x4: this.point4().x,
            y4: this.point4().y,
            x5: this.point5().x,
            y5: this.point5().y,
            x6: this.point6().x,
            y6: this.point6().y,
            x7: this.point7().x,
            y7: this.point7().y,
            x8: this.point8().x,
            y8: this.point8().y,
            x9: this.point9().x,
            y9: this.point9().y,
            x10: this.point10().x,
            y10: this.point10().y,
            x11: this.point11().x,
            y11: this.point11().y,
            x12: this.point12().x,
            y12: this.point12().y,
            x13: this.point13().x,
            y13: this.point13().y,
            x14: this.point14().x,
            y14: this.point14().y,
            x15: this.point15().x,
            y15: this.point15().y
        };
    }
}
