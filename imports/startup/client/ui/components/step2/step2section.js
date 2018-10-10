import './step2section.html';

Template.step2section.helpers({
    cpr() {
        const value = (this.Fy + this.Fu) / (2 * this.Fy);
        return value <= 1.2 ? value : 1.2;
    }
});
