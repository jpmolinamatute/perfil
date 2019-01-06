import './step2section.html';

Template.step2section.helpers({
    cpr() {
        let value = (this.Fy + this.Fu) / (2 * this.Fy);
        value = Math.floor(value * 100) / 100;
        return value <= 1.2 ? value : 1.2;
    },
    mpr(cpr) {
        let value = (cpr * this.Ry * this.Fy * this.Zx) / 100;
        value = Math.floor(value * 100) / 100;
        return value;
    }
});
