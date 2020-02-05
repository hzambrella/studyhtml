function getAllUrlParams() {
    var arr = window.location.search.substr(1).split('#')[0].split("&"),
        Params = {},
        i;

    for (i = 0; i < arr.length; i++) {
        Params[arr[i].split("=")[0]] = arr[i].split("=")[1];
    }

    return Params;
}

function extractUrls() {
    var params = getAllUrlParams(),
        reportid = params["report"],
        url = {
            reportid: reportid,
            report: urlAddRandomNo("../../grf/" + reportid + ".grf")
        };

    if (params.hasOwnProperty("data")) {
        url.data = "/data/DataCenter.jsp?";

        if (params.hasOwnProperty("report")) {
            delete params["report"];
        }

        for (var key in params) {
            var item = params[key];
            url.data += key + "=" + params[key] + "&"
        }

        url.data = url.data.slice(0, -1)
    }

    document.title += reportid; //改变文档标题，指示当前运行的报表
    console.log(url);
    return url;
}

function prepareViewArgs() {
    var args = extractUrls();

    if (!args.url) {
        args.onreportload = function (Report) {
            var QuerySQL = Report.DetailGrid ? Report.DetailGrid.Recordset.QuerySQL : Report.QuerySQL;

            if (QuerySQL) {
                SyncReportLoadData(Report, encodeURI("../../../data/DataCenter.jsp?QuerySQL=" + QuerySQL));
            }
        }
    }

    return args;
}

function prepareDesignArgs() {
    var args = extractUrls();
    args.exparams = "<param name=OnSaveReport value=OnSaveReport>";
    args.saveurl = "../DesignReportSave.jsp?report=" + args.reportid;

    if (!args.url) {
        args.onreportload = function (Report) {
            var QuerySQL = Report.DetailGrid ? Report.DetailGrid.Recordset.QuerySQL : Report.QuerySQL;

            if (QuerySQL) {
                ReportDesigner.OnRequestData = function (Report) {
                    SyncReportLoadData(Report, encodeURI("../../../data/DataCenter.jsp?QuerySQL=" + QuerySQL));
                }
            }
        };
    }

    return args;
}
