module.exports = {
  getInstance: function () {
    if (this._instance === undefined) {
      this._instance = new this();
    }
    return this._instance;
  }
};