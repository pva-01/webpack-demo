var DemograficMarkTool = require('./index');
var srvc = new DemograficMarkTool.ServicesApi();
srvc.getLabels(function (a, b, c) {
    alert(b);
});