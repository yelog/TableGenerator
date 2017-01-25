var cols, rows, isDraggedBetweenCells = !1, isMouseDown = !1, mouseDownCell, selectedRowspan, selectedColspan;
function isInt(a) {
    return /^\d+$/.test(a)
}
Array.indexOf || (Array.prototype.indexOf = function (a) {
    for (var e = 0; e < this.length; e++)if (this[e] == a)return e;
    return -1
});
function RemoveSelection() {
    window.getSelection ? window.getSelection().removeAllRanges() : document.selection.createRange && (document.selection.createRange(), document.selection.empty())
}
function getCellRows(a) {
    return getCellValue(a, "r")
}
function getCellOffset(a) {
    return getCellValue(a, "o")
}
function getCellCols(a) {
    return getCellValue(a, "c")
}
function getCellValue(a, e) {
    var b = $(a).attr("class"), b = b.split(" ");
    allClassesLength = b.length;
    for (var c = 0; c < allClassesLength; c++)b[c].charAt(0) === e ? b[c] = parseInt(b[c].substr(1, b[c].length - 1), 10) : (b.splice(c, 1), allClassesLength--, c--);
    return b
}
function exportHTML() {
    var enter = $("#bsEnter").prop("checked") == true ? "" : "\n";
    var bs = $("#bsEnter").prop("checked") == true ? "" : "    ";
    var clearTh = $("#clearTh").prop("checked");
    if (clearTh) {
        var a = $("tbody").clone(), a = a.html(), a = a.toLowerCase(), a = a.replace(/rowspan="1"/gi, ""), a = a.replace(/colspan="1"/gi, ""), a = a.replace(/class="([^"]*)"/gi, ""), a = a.replace(/class="([^"]*)"/gi, ""), a = a.replace(/<div contenteditable="true">/gi, ""), a = a.replace(/<div contenteditable=true>/gi, ""), a = a.replace(/&nbsp;/gi, ""), a = a.replace(/<\/div>/gi, ""), a = a.replace(/\s\s\s/gi, " "), a = a.replace(/\s\s/gi, " "), a = a.replace(/<td\s>/gi, "<td>"), a = a.replace(/<tr>\s<td/gi, "<tr><td"), a = a.replace(/> <\/td>/gi,
            "></td>"), a = a.replace(/<\/td>\s</gi, "</td><"), a = a.replace(/<tr>/gi, enter + bs + "<tr>" + enter), a = a.replace(/<\/tr>/gi, enter + bs + "</tr>"), a = a.replace(/d><td/gi, "d>" + enter + "<td"), a = a.replace(/<td/gi, bs + bs + "<td"), a = a.replace(/<td>\s/gi, "<td>"), a = a.replace(/\s>\s/gi, ">"), a = a.replace(/" >/gi, '">');
        $("#export").val("<table>" + a + enter + "</table>")
    } else {
        var h = $("thead").clone(), h = h.html(), h = h.toLowerCase(), h = h.replace(/rowspan="1"/gi, ""), h = h.replace(/colspan="1"/gi, ""), h = h.replace(/class="([^"]*)"/gi, ""), h = h.replace(/class="([^"]*)"/gi, ""), h = h.replace(/<div contenteditable="true">/gi, ""), h = h.replace(/<div contenteditable=true>/gi, ""), h = h.replace(/&nbsp;/gi, ""), h = h.replace(/<\/div>/gi, ""), h = h.replace(/\s\s\s/gi, " "), h = h.replace(/\s\s/gi, " "), h = h.replace(/<th\s>/gi, "<th>"), h = h.replace(/<tr>\s<th/gi, "<tr><th");
        h = h.replace(/> <\/th>/gi,
            "></th>"), h = h.replace(/<\/th>\s</gi, "</th><"), h = h.replace(/<tr>/gi, enter + bs + bs + "<tr>" + enter + bs), h = h.replace(/<\/tr>/gi, enter + bs + bs + "</tr>"), h = h.replace(/h><th/gi, "h>" + enter + bs + "<th"), h = h.replace(/<th/gi, bs + bs + "<th"), h = h.replace(/<th>\s/gi, "<th>"), h = h.replace(/\s>\s/gi, ">"), h = h.replace(/" >/gi, '">');
        var a = $("tbody").clone(), a = a.html(), a = a.toLowerCase(), a = a.replace(/rowspan="1"/gi, ""), a = a.replace(/colspan="1"/gi, ""), a = a.replace(/class="([^"]*)"/gi, ""), a = a.replace(/class="([^"]*)"/gi, ""), a = a.replace(/<div contenteditable="true">/gi, ""), a = a.replace(/<div contenteditable=true>/gi, ""), a = a.replace(/&nbsp;/gi, ""), a = a.replace(/<\/div>/gi, ""), a = a.replace(/\s\s\s/gi, " "), a = a.replace(/\s\s/gi, " "), a = a.replace(/<td\s>/gi, "<td>"), a = a.replace(/<tr>\s<td/gi, "<tr><td"), a = a.replace(/> <\/td>/gi,
            "></td>"), a = a.replace(/<\/td>\s</gi, "</td><"), a = a.replace(/<tr>/gi, enter + bs + bs + "<tr>" + enter + bs), a = a.replace(/<\/tr>/gi, enter + bs + bs + "</tr>"), a = a.replace(/d><td/gi, "d>" + enter + bs + "<td"), a = a.replace(/<td/gi, bs + bs + "<td"), a = a.replace(/<td>\s/gi, "<td>"), a = a.replace(/\s>\s/gi, ">"), a = a.replace(/" >/gi, '">');
        $("#export").val("<table>" + enter + bs + "<thead>" + h + enter + bs + "</thead>" + enter + bs + "<tbody>" + a + enter + bs + "</tbody>" + enter + "</table>")
    }
}
function reindexTable() {
    for (var a = [], e = [], b = 0; b < cols; b++)a[b] = "c" + b;
    for (b = 0; b < rows; b++)e[b] = a.slice();
    for (var a = $("tr", "tbody"), c, g, f, i, b = 0; b < rows; b++) {
        c = a.eq(b).children();
        g = c.size();
        for (var j = colOffset = 0; j < g; j++) {
            c.eq(j).removeClass();
            f = parseInt(c.eq(j).attr("colspan"), 10);
            i = parseInt(c.eq(j).attr("rowspan"), 10);
            void 0 == c.eq(j).attr("colspan") && (f = 1);
            void 0 == c.eq(j).attr("rowspan") && (i = 1);
            for (var h = 0; h < i; h++)for (var o = 0; o < f; o++) {
                for (var k = 0; "" === e[b + h][o + colOffset + k];)k++;
                c.eq(j).addClass(e[b + h][o + colOffset +
                    k] + " r" + (b + h));
                e[b + h].splice(o + k + colOffset, 1, "")
            }
            colOffset += f
        }
    }
}
$(function () {
    $("#generate").on("click", function () {
        cols = parseInt($("#cols").val(), 10);
        rows = parseInt($("#rows").val(), 10);
        var clearTh = $("#clearTh").prop("checked") == true ? "none" : "";
        if (isInt(cols))if (isInt(rows)) {
            $("#tableWrap").empty().append("<table><thead style='display: " + clearTh + "'><tr></tr></thead><tbody></tbody></table>");
            var $tableHead = $("tr", "thead");
            for (var a = 1; a <= cols; a++) {
                $tableHead.append("<th class='c" + (a - 1) + "'><div contenteditable='true'>&nbsp;</div></th>");
            }
            for (var a = 1; a <= rows; a++) {
                $("tbody").append("<tr></tr>");
                $generatedRow = $("tr", "tbody").eq(a - 1);
                for (var e = 1; e <= cols; e++)$generatedRow.append("<td class='c" + (e - 1) + " r" + (a - 1) + "' colspan='1' rowspan='1'><div contenteditable='true'>&nbsp;</div></td>")
            }
            exportHTML()
        } else alert("Invalid row input"); else alert("Invalid column input")
    });
    $("#addRow").on("click", function (e) {
        cols = parseInt($("#cols").val(), 10);
        rows = parseInt($("#rows").val(), 10);
        $("tbody").append("<tr></tr>")
        for (var e = 1; e <= cols; e++) {
            $("tbody>tr:last").append("<td class='c" + (e - 1) + " r" + rows + "' colspan='1' rowspan='1'><div contenteditable='true'>&nbsp;</div></td>");
        }
        $("#rows").val(rows + 1);
    });
    $("#addCol").on("click", function (e) {
        cols = parseInt($("#cols").val(), 10);
        rows = parseInt($("#rows").val(), 10);
        $("thead>tr").append("<th class='c" + cols + "'><div contenteditable='true'>&nbsp;</div></th>");
        $("tbody>tr").each(function (i) {
            $(this).append("<td class='c" + cols + " r" + i + "' colspan='1' rowspan='1'><div contenteditable='true'>&nbsp;</div></td>");
        });
        $("#cols").val(cols + 1);
    });
    $("#delRow").on("click", function (e) {
        $("tbody>tr:not(:last)").each(function (index) {
            $(this).find("td").each(function () {
                var n = parseInt($(this).attr("rowspan"), 10);
                if (n + index == $("tbody>tr").length) {
                    $(this).attr("rowspan",n - 1);
                    var classes = $(this).attr("class").split(" ");
                    var maxRow = 0;
                    for (var i = 0 ; i<classes.length; i++){
                        if(classes[i].substring(0,1)=="r" && parseInt(classes[i].substring(1)) > parseInt(maxRow)){
                            maxRow = classes[i].substring(1);
                        }
                    }
                    $(this).removeClass("r"+maxRow);
                }
            })
        });
        $("tbody>tr:last").remove();
        $("#rows").val(parseInt($("#rows").val(), 10) - 1);
    });
    $("#delCol").on("click", function (e) {
        var nextStatus = 0;
        $("tbody>tr").each(function () {
            if(nextStatus>0){
                nextStatus--;
                return true;
            }
            var status = 0;
            $(this).find("td").each(function () {
                if($(this).attr("class").split(" ").length>2){
                    var n = parseInt($(this).attr("colspan"), 10);
                    if (n + parseInt($(this).attr("class").split(" ")[0].substr(1), 10) == $("thead>tr>th").length) {
                        $(this).attr("colspan",n - 1);
                        status = 1;
                        var classes = $(this).attr("class").split(" ");
                        var maxCol = 0;
                        for (var i = 0 ; i<classes.length; i++){
                            if(classes[i].substring(0,1)=="c" && parseInt(classes[i].substring(1)) > parseInt(maxCol)){
                                maxCol = classes[i].substring(1);
                            }
                            if(classes[i].substring(0,1)=="r"){
                                nextStatus++;
                            }
                        }
                        $(this).removeClass("c"+maxCol);
                        nextStatus--;
                        return false;
                    }
                }
            });
            if(status == 0){
                $(this).find("td:last").remove();
            }
        });
        $("thead>tr>th:last").remove();
        $("#cols").val(parseInt($("#cols").val(), 10) - 1);
    });
    $("#generate").trigger("click")
});
function selectCells(a, e) {
    for (var b = getCellCols(a), c = getCellRows(a), g = getCellCols(e), f = getCellRows(e), i = b.length, j = c.length, h = g.length, o = f.length, k = 100, l = 0, m = 100, n = 0, d = 0; d < i; d++)b[d] < k && (k = b[d]), b[d] > l && (l = b[d]);
    for (d = 0; d < h; d++)g[d] < k && (k = g[d]), g[d] > l && (l = g[d]);
    for (d = 0; d < j; d++)c[d] < m && (m = c[d]), c[d] > n && (n = c[d]);
    for (d = 0; d < o; d++)f[d] < m && (m = f[d]), f[d] > n && (n = f[d]);
    for (d = m; d <= n; d++)for (c = k; c <= l; c++)$(".c" + c).filter(".r" + d).addClass("s");
    do {
        b = !1;
        f = $(".s");
        i = f.size();
        g = [];
        c = [];
        for (d = 0; d < i; d++)g = g.concat(getCellCols(f.eq(d))),
            c = c.concat(getCellRows(f.eq(d)));
        d = Math.max.apply(Math, g);
        g = Math.min.apply(Math, g);
        f = Math.max.apply(Math, c);
        c = Math.min.apply(Math, c);
        d > l && (l = d, b = !0);
        g < k && (k = g, b = !0);
        f > n && (n = f, b = !0);
        c < m && (m = c, b = !0);
        if (b)for (d = m; d <= n; d++)for (c = k; c <= l; c++)$(".c" + c).filter(".r" + d).addClass("s"); else selectedColspan = l - k + 1, selectedRowspan = n - m + 1
    } while (b)
}
$(function () {
    $("td").live("mousedown", function (a) {
        1 === a.which && (RemoveSelection(), isMouseDown = !0, mouseDownCell = this)
    });
    $("td").live("mousemove", function () {
        isMouseDown && mouseDownCell != this && (isDraggedBetweenCells = !0, RemoveSelection(), $(".s").removeClass("s"), selectCells(mouseDownCell, this))
    });
    $(document).on("mouseup", function () {
        isMouseDown && (isMouseDown = !1, mouseDownCell = void 0, isDraggedBetweenCells = !1)
    });
    $("#tableWrap").on("mousedown", function (a) {
        1 === a.which && $(".s").removeClass("s")
    })
});
function getLowestCol(a) {
    a = getCellCols(a);
    return Math.min.apply(Math, a)
}
function optimiseColspan() {
    var a, e, b = $("tr"), c = b.size(), g, f, i, j, h = [];
    for (a = 0; a < cols; a++)h[a] = a + 1;
    for (e = 0; e < c; e++) {
        g = b.eq(e).children();
        f = g.size();
        for (a = 0; a < f; a++)i = getLowestCol(g.eq(a)), j = void 0 == g.eq(a).attr("colspan") ? 1 : parseInt(g.eq(a).attr("colspan"), 10), -1 !== h.indexOf(i + j) && h.splice(h.indexOf(i + j), 1);
        if (1 > h.length)break
    }
    cols -= h.length;
    for (a = 0; a < h.length; a++) {
        b = ".c" + (h[a] - 1);
        $classArray = $(b);
        $classArrayL = $classArray.size();
        for (c = 0; c < $classArrayL; c++)b = parseInt($classArray.eq(c).attr("colspan"),
            10), $classArray.eq(c).attr("colspan", b - 1)
    }
}
function optimiseRowspan() {
    for (var a = $("tr:empty"), e = a.length, b, c, g, f, i = 0; i < e; i++) {
        b = $("tr").index(a.eq(i));
        b = $(".r" + b);
        c = b.length;
        for (f = 0; f < c; f++)g = b.eq(f).attr("rowspan") - 1, b.eq(f).attr("rowspan", g)
    }
    rows -= $("tr:empty").size();
    $("tr:empty").remove()
}
function mergeCells() {
    for (var a = $(".s"), e = a.length, b = "", c = 0; c < e; c++)b += " " + a.eq(c).attr("class");
    b = b.replace(/s/gi, "");
    selectedColspan === cols && (rows = rows - selectedRowspan + 1, selectedRowspan = 1);
    a.eq(0).before("<td class='" + b + "' colspan='" + selectedColspan + "' rowspan='" + selectedRowspan + "'><div contenteditable='true'>&nbsp;</div>");
    a.remove();
    selectedColspan === cols && $("tr:empty").remove();
    reindexTable();
    optimiseRowspan();
    optimiseColspan();
    reindexTable();
    exportHTML();
}
$(function () {
    $("#merge").on("click", function () {
        mergeCells();
    })
});
$(function () {
    $("div").live("blur", function () {
        exportHTML();
    });
    $("td").live("click", function () {
        $(this).children("div").focus()
    });
    $("#bsEnter").change(function () {
        exportHTML();
    });
    $("#clearTh").change(function () {
        if ($("#clearTh").prop("checked")) {
            $("thead").css("display", "none");
        } else {
            $("thead").css("display", "");
        }
        exportHTML();
    })
});