document.addEventListener("DOMContentLoaded", () => {
    new app();
});

class app {
    constructor() {

        const pageManager = new PageManager();
        const i18n = new I18n();
        i18n.setData(_lang);
        const divImgviews = document.querySelector(".js-imgviews");
        const textInclude = document.querySelector(".js-include");
        const textExclude = document.querySelector(".js-exclude");
        const btnFilter = document.querySelector(".js-filter");
        const btnMoreOptions = document.querySelector(".js-moreOptions");
        const divSearchBottom = document.querySelector(".js-searchBottom");
        const selectSort = document.querySelector(".js-sort");
        const selectPageSize = document.querySelector(".js-pageSize");
        const textExcludeCount = document.querySelector(".js-excludeCount");
        const textIgnorePrompts = document.querySelector(".js-ignorePrompts");
        const divDoc = document.querySelector(".js-doc");
        const btnDocClose = document.querySelector(".js-docClose");
        const btnDocOpen = document.querySelector(".js-docOpen");
        const btnLang = document.querySelector(".js-langOpen");
        const divLangMenu = document.querySelector(".js-langMenu");

        // 初始化圖片的提示詞數據
        for (let i = 0; i < _characterList.length; i++) {
            const data = _characterList[i];
            const promptParts = data.prompt.split(",")
                .map(item => item.trim())
                .filter(item => item !== "");
            const name = promptParts[0];
            const series = promptParts.length > 1 ? promptParts[1] : "";
            const nameAndSeries = `${name}, ${series}`;
            const count = _imageCountList[nameAndSeries.replace(/\\/g, "")] || 0;

            data.promptParts = promptParts; // 分割後的提示詞
            data.name = name; // 角色名稱
            data.series = series; // 作品名稱
            data.nameAndSeries = nameAndSeries; // 角色+作品名稱
            data.count = count; // 圖片數量
            // 將 promptParts 中的特殊符號與空格去除
            data.cleanPromptParts = data.promptParts
                .map(part => part.replace(/[\W_]+/g, "").toLowerCase());
        }

        updateImgviews();
        initFromUrl();

        // 語言選單
        (() => {

            /**
             * 從瀏覽器取得使用者當前使用的語言
             */
            function getBrowserLang() {
                let browserLang = navigator.language.toLowerCase();
                if (browserLang == "zh" || browserLang.startsWith("zh-")) {
                    return "zh-TW";
                }
                /*if (browserLang.indexOf("ja") === 0) { // 日本
                    return "ja";
                }
                if (browserLang.indexOf("ko") === 0) { // 韓文
                    return "ko";
                }*/
                /*if (browserLang == "en" || browserLang.indexOf("en-") === 0) {
                    return "en";
                }*/
                return "en";
            }

            /**
             * 更新語言
             * @param {*} value 
             */
            function updateLang(value) {
                i18n.setLang(value);
                // console.log("當前語言：", i18n.getLang());

                window.localStorage.setItem("lang", i18n.getLang());

                // 更新語言選單顯示
                arItem.forEach(element => {
                    if (element.getAttribute("data-lang") === value) {
                        element.classList.add("active");
                    } else {
                        element.classList.remove("active");
                    }
                });
            }

            let isShow = false;
            let arItem = divLangMenu.querySelectorAll(".item");

            // 初始化語言，如果沒有設定語言，則使用瀏覽器語言
            let lang = window.localStorage.getItem("lang") || getBrowserLang();
            updateLang(lang);

            btnLang.addEventListener("click", () => {
                if (divLangMenu.style.display === "none" || divLangMenu.style.display === "") {
                    divLangMenu.style.display = "block";
                    isShow = true;
                }
            });

            window.addEventListener("pointerdown", (e) => {
                if (isShow) {
                    divLangMenu.style.display = "none";
                    isShow = false;
                }
            }, false)

            // 給每一個語言選單項目添加點擊事件
            arItem.forEach(element => {
                element.addEventListener("pointerdown", (e) => {
                    let dataLang = element.getAttribute("data-lang");
                    updateLang(dataLang);
                });
            });

        })();


        // 說明區塊
        if (window.localStorage.getItem("docOpen") == "false") {
            docShow(false);
        } else {
            docShow(true);
        }
        btnDocOpen.addEventListener("click", () => {
            if (divDoc.style.display === "none") {
                docShow(true);
            } else {
                docShow(false);
            }
        });
        btnDocClose.addEventListener("click", () => {
            docShow(false);
        });
        function docShow(value) {
            if (value) {
                divDoc.style.display = "";
                window.localStorage.setItem("docOpen", "true");
            } else {
                divDoc.style.display = "none";
                window.localStorage.setItem("docOpen", "false");
            }
        }

        // 查詢按鈕
        btnFilter.addEventListener("click", () => {
            updateImgviews();
            updateUrl();
        });

        // 進階設定
        btnMoreOptions.addEventListener("click", () => {
            if (divSearchBottom.style.display === "none" || divSearchBottom.style.display === "") {
                divSearchBottom.style.display = "block";
            } else {
                divSearchBottom.style.display = "none";
            }
        });

        /**
         * 更新圖片視圖
         */
        function updateImgviews() {

            let datas = filterAndSort();
            //console.log("符合條件的圖片數量：", datas.length);

            const pageSize = parseInt(selectPageSize.value);

            pageManager.init(datas.length, pageSize,
                // 頁碼點擊事件
                (startIndex, endIndex, currentPage) => {

                    // 更新 title
                    if (pageManager.currentPage > 1)
                        document.title = `Drawing Spells - ${pageManager.currentPage}`;
                    else
                        document.title = "Drawing Spells";

                    divImgviews.innerHTML = "";

                    for (let i = startIndex; i < endIndex; i++) {
                        const data = datas[i];

                        const div = Lib.newDom(
                            `<div class="imgview">
                                <div class="title" title="${i18n.t("imageCount")}" i18n="imageCount">${data.count}</div>
                                <img class="img" src="./data/character/${data.file}" data-zoomable>
                                <div class="btn-list">
                                    <div class="btn btn__copy1 js-copyName" title="${i18n.t("copyName")}" i18n="copyName"></div>
                                    <div class="btn btn__copy2 js-copySeries" title="${i18n.t("copySeries")}" i18n="copySeries"></div>
                                    <div class="btn btn__copy3 js-copyPrompt" title="${i18n.t("copyPrompt")}" i18n="copyPrompt"></div>
                                </div>
                                <div class="prompt">
                                    <span>${Lib.escape(data.prompt)}</span>
                                </div>
                            </div>`);

                        const divPrompt = div.querySelector(".prompt");
                        const btnCopyName = div.querySelector(".js-copyName");
                        const btnCopySeries = div.querySelector(".js-copySeries");
                        const btnCopyPrompt = div.querySelector(".js-copyPrompt");

                        // 產生一個跟提示詞一樣長度的背景，並在 300毫秒後淡出
                        function newBg(text) {
                            const divBg = Lib.newDom(
                                `<div class="bg">
                                    <span>${Lib.escape(text)}</span>
                                </div>`);
                            setTimeout(() => {
                                divBg.style.opacity = "0";
                            }, 300);
                            setTimeout(() => {
                                divBg.remove();
                            }, 1000);

                            divPrompt.appendChild(divBg);
                        }

                        // 點擊圖片時，將提示詞複製到剪貼簿
                        btnCopyName.addEventListener("click", () => {
                            newBg(data.name);
                            navigator.clipboard.writeText(data.name)
                                .then(() => {
                                })
                                .catch(err => {
                                    console.error("複製失敗：", err);
                                });
                        });
                        btnCopySeries.addEventListener("click", () => {
                            newBg(data.nameAndSeries);
                            navigator.clipboard.writeText(data.nameAndSeries)
                                .then(() => {
                                })
                                .catch(err => {
                                    console.error("複製失敗：", err);
                                });
                        });
                        btnCopyPrompt.addEventListener("click", () => {
                            // 如果有設定忽略提示詞，則將其從提示詞中移除

                            // 用「,」或「;」或換行分割
                            // 必須完全匹配提示詞，但不區分大小寫
                            // 支援使用「*」來匹配任意字串
                            const ignorePrompts = textIgnorePrompts.value
                                .split(/[,;\n]/)
                                .map(item => item.trim())
                                .filter(item => item !== "");
                            const ar = [];
                            for (const prompt of data.promptParts) {
                                let isIgnored = false;
                                for (const ignorePrompt of ignorePrompts) {
                                    // 如果是 *，則忽略所有提示詞
                                    if (ignorePrompt === "*") {
                                        isIgnored = true;
                                        break;
                                    }
                                    // 如果提示詞包含 *，則使用正則表達式匹配
                                    if (ignorePrompt.includes("*")) {
                                        const regex = new RegExp("^" + ignorePrompt.replace(/\*/g, ".*") + "$", "i");
                                        if (regex.test(prompt)) {
                                            isIgnored = true;
                                            break;
                                        }
                                    } else {
                                        // 完全匹配，不區分大小寫
                                        if (prompt.toLowerCase() === ignorePrompt.toLowerCase()) {
                                            isIgnored = true;
                                            break;
                                        }
                                    }
                                }
                                if (!isIgnored) {
                                    ar.push(prompt);
                                }
                            }

                            newBg(data.prompt);
                            navigator.clipboard.writeText(ar.join(", "))
                                .then(() => {
                                })
                                .catch(err => {
                                    console.error("複製失敗：", err);
                                });
                        });

                        Lib.controlTextSelection(divPrompt);

                        divImgviews.appendChild(div);
                    }

                    // 頁面捲到 .js-page-btns
                    const domPageButton = document.querySelector(".js-page-btns");
                    domPageButton.scrollIntoView({ /*behavior: "smooth"*/ });

                    mediumZoom('[data-zoomable]')
                },
                // 更新網址事件
                () => {
                    // 更新網址
                    updateUrl();
                }
            );
        }

        /**
         * 過濾與排序
         * @returns {Array} 符合條件的資料 
         */
        function filterAndSort() {

            let datas = [];

            const excludeCount = parseInt(textExcludeCount.value) || 0;

            // 「包含」的條件
            const includes = textInclude.value
                .split(/[,]|\n/) // 用「,」或換行分割
                .map(item => item.trim())
                .filter(item => item !== "");
            const processedIncludes = includes.map(pattern => {
                // 支援使用「|」來分隔多個條件
                const subPatterns = pattern.split("|").map(p => p.trim()).filter(p => p !== "");
                // 將每個子條件清理（移除特殊符號與空格，轉小寫）
                return subPatterns.map(subPattern => subPattern.replace(/[\W_]+/g, "").toLowerCase());
            });

            // 「不包含」的條件
            const excludes = textExclude.value
                .split(/[,]|\n/)
                .map(item => item.trim())
                .filter(item => item !== "");


            // 過濾
            for (const data of _characterList) {

                // 過濾圖片數量過少的角色
                if (data.count < excludeCount) {
                    continue; // 跳過圖片數量過少的角色
                }

                // 「包含」條件
                // 每一個提示詞逐一比對，不能跨詞，例如「red heir, red eyes」 不能用「heir red」來匹配
                // 比較時忽略所有特殊符號與空格，並不區分大小寫，只要字串包含就行，例如「isokaze \(kancolle\)」可以用「Isokaze- _(Kancol」來匹配
                // 支援使用「|」來分隔多個條件，例如「1girl|1boy」可以匹配「1girl」或「1boy」
                if (processedIncludes.length > 0) {
                    const includeMatch = processedIncludes.every(cleanPatterns => {
                        // 檢查是否有任一子條件符合
                        return cleanPatterns.some(cleanPattern => {
                            // 檢查 cleanPromptParts 中是否有包含 cleanPattern 的部分
                            return data.cleanPromptParts.some(part => part.includes(cleanPattern));
                        });
                    });

                    if (!includeMatch) {
                        continue; // 不符合包含條件，跳過
                    }
                }

                // 「不包含」條件
                // 每一個提示詞逐一比對，不能跨詞
                // 必須完全匹配，不區分大小寫，例如「red heir」不能用「red」來匹配
                // 只要有任何一個提示詞符合，就跳過這個角色
                if (excludes.length > 0) {
                    const excludeMatch = excludes.some(excludePattern => {
                        // 清理排除條件
                        const cleanExcludePattern = excludePattern.replace(/[\W_]+/g, "").toLowerCase();
                        // 檢查 cleanPromptParts 中是否有包含 cleanExcludePattern 的部分
                        return data.cleanPromptParts.some(part => part === cleanExcludePattern);
                    });

                    if (excludeMatch) {
                        continue; // 不符合不包含條件，跳過
                    }
                }

                datas.push(data);
            }
            // 圖片數量
            if (selectSort.value === "count") {
                datas.sort((a, b) => {
                    const aCount = a.count || 0;
                    const bCount = b.count || 0;
                    return bCount - aCount; // 降序
                });
            }
            // 預設排序
            else if (selectSort.value === "default") {
                // 將 Prompt 用「,」分割後，第一個詞是角色名稱，第二個詞是作品
                // 排序順位：作品的所有圖片數量、作品名稱、角色名稱
                let sortMap = new Map();
                for (const data of datas) {

                    const series = data.promptParts.length > 1 ? data.promptParts[1] : "";
                    if (!sortMap.has(series)) {
                        sortMap.set(series, 0);
                    }
                    sortMap.set(series, sortMap.get(series) + data.count);
                }
                //console.log("作品數量統計：", sortMap);

                // 如果是 original 則視為沒有作品系列，將其放在最後
                if (sortMap.has("original")) {
                    sortMap.set("original", 0);
                }

                datas.sort((a, b) => {
                    const aParts = a.promptParts;
                    const bParts = b.promptParts;

                    // 作品名稱
                    const aSeries = aParts.length > 1 ? aParts[1] : "";
                    const bSeries = bParts.length > 1 ? bParts[1] : "";

                    // 角色名稱
                    const aName = aParts[0];
                    const bName = bParts[0];

                    // 作品數量
                    const aCount = sortMap.get(aSeries) || 0;
                    const bCount = sortMap.get(bSeries) || 0;

                    // 先比較作品數量，再比較作品名稱，最後比較角色名稱
                    if (aCount !== bCount) {
                        return bCount - aCount; // 降序
                    }
                    if (aSeries !== bSeries) {
                        return aSeries.localeCompare(bSeries);
                    }
                    return aName.localeCompare(bName);
                });
            }
            // 隨機排序
            else {
                datas.sort(() => Math.random() - 0.5);
            }

            return datas;
        }

        /**
         * 將當前的設定記錄進網址
         */
        function updateUrl() {
            const url = new URL(window.location.href);
            url.searchParams.set("page", pageManager.currentPage);
            url.searchParams.set("include", textInclude.value.trim());
            url.searchParams.set("exclude", textExclude.value.trim());
            url.searchParams.set("sort", selectSort.value);
            url.searchParams.set("pageSize", selectPageSize.value);
            url.searchParams.set("excludeCount", textExcludeCount.value);
            url.searchParams.set("ignorePrompts", textIgnorePrompts.value.trim());

            // 記錄歷史狀態
            history.pushState({}, "", url.toString());
        }

        // 初始化時，從網址中讀取參數
        async function initFromUrl() {

            const url = new URL(window.location.href);

            const include = url.searchParams.get("include") || "";
            const exclude = url.searchParams.get("exclude") || "";
            const sort = url.searchParams.get("sort") || "default";
            const pageSize = parseInt(url.searchParams.get("pageSize")) || 50;
            const excludeCount = parseInt(url.searchParams.get("excludeCount")) || 30;
            const ignorePrompts = url.searchParams.get("ignorePrompts") || "";
            const page = parseInt(url.searchParams.get("page")) || 1;

            // 判斷是否需要重新載入資料
            let reloadData = false;
            if (textInclude.value !== include ||
                textExclude.value !== exclude ||
                selectSort.value !== sort ||
                selectPageSize.value !== pageSize.toString() ||
                textExcludeCount.value !== excludeCount.toString() ||
                textIgnorePrompts.value !== ignorePrompts) {
                reloadData = true;
            }

            textInclude.value = include;
            textExclude.value = exclude;
            selectSort.value = sort;
            selectPageSize.value = pageSize;
            textExcludeCount.value = excludeCount;
            textIgnorePrompts.value = ignorePrompts;

            if (reloadData) {
                // 重新載入資料
                updateImgviews();
            }

            pageManager.currentPage = page;
        }

        window.addEventListener("popstate", (event) => {
            initFromUrl();
        });
    }
}

class Lib {

    /**
     * html字串 轉 dom物件
     */
    static newDom(html) {
        const template = document.createElement("template");
        template.innerHTML = html.trim();
        return template.content.firstChild;
    }

    /**
     * 移除可能破壞 html 的跳脫符號
     */
    static escape(htmlStr) {

        if (htmlStr === undefined || htmlStr === null) {
            return "";
        }
        // 如果不是 字串
        if (typeof htmlStr !== "string") {
            return htmlStr + "";
        }

        return htmlStr.replace(/&/g, "&amp;")
            .replace(/</g, "&lt;")
            .replace(/>/g, "&gt;")
            .replace(/"/g, "&quot;")
            .replace(/'/g, "&#39;");
    }

    /**
     * 讓元素進入編輯狀態，避免選取文字時，因滑鼠超出邊界而觸發全選
     */
    static controlTextSelection(div) {

        // 在滑鼠按下的狀態使用輸入法，依然會導致文字被修改，但一般人不會這樣操作，所以不處理

        // 阻止編輯
        div.addEventListener("beforeinput", async (e) => {
            e.preventDefault();
        });

        // 如果一直處於編輯狀態，會導致跳出輸入法
        // 所以開始選取文字才啟用編輯
        div.addEventListener("mousedown", () => {
            if (div.getAttribute("contenteditable") !== "true") {
                div.setAttribute("contenteditable", "true");
            }
        });
        // 滑鼠放開後，取消編輯
        document.addEventListener("mouseup", () => {
            if (div.getAttribute("contenteditable") !== "false") {
                div.setAttribute("contenteditable", "false");
            }
        });
    }
}

class PageManager {

    constructor() {
        // 資料筆數
        this._dataCount = 0;
        // 一頁多少筆資料
        this._pageSize = 50;
        // 當前頁
        this._currentPage = 1;
        // 總頁數
        this._totalPage = 1;
        // 按鈕區塊最大數量
        this._maxButtonCount = 6;
        // 按鈕 Click 事件
        this._onPageClick = () => { };
        // 更新網址事件
        this._onUpdateUrl = () => { };
    }

    /**
     * 初始化分頁管理器
     * @param {*} dataCount 資料筆數
     * @param {*} pageSize 每頁顯示數量
     * @param {*} onPageClick 頁碼點擊事件
     * @param {*} onUpdateUrl 更新網址事件
     */
    init(dataCount, pageSize = 50, onPageClick, onUpdateUrl) {
        this._dataCount = dataCount;
        this._pageSize = pageSize;
        this._totalPage = Math.ceil(dataCount / this._pageSize);
        this._currentPage = 1;
        this._onPageClick = onPageClick;
        this._onUpdateUrl = onUpdateUrl || (() => { });

        this.update();
        this.triggerPageClick();
    }

    /**
     * 重新渲染頁碼按鈕區塊
     */
    update() {
        const domPageButtonAll = document.querySelectorAll(".js-page-btns");

        for (const domPageButtons of domPageButtonAll) {

            domPageButtons.innerHTML = "";

            let startPage = Math.max(1, this._currentPage - Math.floor(this._maxButtonCount / 2));
            let endPage = Math.min(this._totalPage, startPage + this._maxButtonCount - 1);

            if (endPage - startPage < this._maxButtonCount - 1) {
                startPage = Math.max(1, endPage - this._maxButtonCount + 1);
            }

            // 1···21 22 23 24 25···999

            const btnList = [];

            // 如果範圍沒有顯示第一頁
            if (startPage > 1) {
                const btnFirst = Lib.newDom(`<div class="page-btn">1</div>`);
                domPageButtons.appendChild(btnFirst);
                btnList.push(btnFirst);

                // 如果不是第一頁，則顯示省略號
                if (startPage > 2) {
                    const btnEllipsis = Lib.newDom(`<div class="page-dot">⋯</div>`);
                    domPageButtons.appendChild(btnEllipsis);
                }
            }

            for (let i = startPage; i <= endPage; i++) {
                const btn = Lib.newDom(`<div class="page-btn">${i}</div>`);

                domPageButtons.appendChild(btn);
                btnList.push(btn);

                // 如果是當前頁，則添加 active 樣式
                if (i === this._currentPage) {
                    btn.classList.add("active");
                }
            }

            // 如果範圍沒有顯示最後一頁
            if (endPage < this._totalPage) {
                // 如果不是最後一頁，則顯示省略號
                if (endPage < this._totalPage - 1) {
                    const btnEllipsis = Lib.newDom(`<div class="page-dot">⋯</div>`);
                    domPageButtons.appendChild(btnEllipsis);
                }

                const btnLast = Lib.newDom(`<div class="page-btn"> ${this._totalPage}</div>`);
                domPageButtons.appendChild(btnLast);
                btnList.push(btnLast);
            }

            for (const btn of btnList) {
                btn.addEventListener("click", () => {
                    // 如果點擊的頁碼是當前頁，則不處理
                    if (parseInt(btn.textContent) === this._currentPage) { return; }
                    this._currentPage = parseInt(btn.textContent);
                    this.update();

                    this.triggerPageClick();
                    // 更新網址
                    this._onUpdateUrl();
                });
            }

        }
    }

    /**
     * 觸發 PageClick
     */
    triggerPageClick() {
        // 資料(起始)、資料(結束)、當前頁碼
        const startIndex = this._currentPage * this._pageSize - this._pageSize;
        const endIndex = Math.min(startIndex + this._pageSize, this._dataCount);

        this._onPageClick(startIndex, endIndex, this._currentPage);
    }

    get currentPage() {
        return this._currentPage;
    }

    set currentPage(value) {
        if (value < 1) value = 1;
        if (value > this._totalPage) value = this._totalPage;

        this._currentPage = value;
        this.update();
        this.triggerPageClick();
    }

}
