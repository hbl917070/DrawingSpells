var _lang = {

    docContent: {
        "zh-TW": `
            Drawing Spells 是一個二次元角色的提示詞查詢工具，這些提示詞可於 AI 繪圖模型使用，<br>
            <a href="https://civitai.com/models/833294" target="_blank">NoobAI-XL</a> 或
            <a href="https://civitai.com/models/795765" target="_blank">Illustrious</a>
            系列的模型，都非常適合用來生成二次元角色。
            <div style="height: 10px;"></div>

            ※ 本站的資料來自 NoobAI-XL 訓練時使用的<a href="https://huggingface.co/datasets/NebulaeWis/e621-2024-webp-4Mpixel" target="_blank">數據集</a>，
            通常 AI 模型難以正確生成過於冷門的角色，因此這裡只列出圖片數量大於30張的角色。        
        `,
        "en": `
            Drawing Spells is a prompt query tool for anime/game characters. The prompts can be used with AI image generation models.<br>
            Models from the <a href="https://civitai.com/models/833294" target="_blank">NoobAI-XL</a> or
            <a href="https://civitai.com/models/795765" target="_blank">Illustrious</a>
            series are both highly suitable for generating anime/game characters.
            <div style="height: 10px;"></div>

            ※ The data on this site comes from the <a href="https://huggingface.co/datasets/NebulaeWis/e621-2024-webp-4Mpixel" target="_blank">dataset</a> used for training NoobAI-XL.<br>
            AI models often struggle to generate obscure characters accurately, so only characters with more than 30 images are listed here.
        `,
    },

    documentation: {
        "zh-TW": "文件",
        "en": "Documentation",
    },

    include: {
        "zh-TW": "包含",
        "en": "Include",
    },
    exclude: {
        "zh-TW": "不包含",
        "en": "Exclude",
    },
    search: {
        "zh-TW": "查詢",
        "en": "Search",
    },
        
    tagMatching: {
        "zh-TW": "提示詞匹配模式",
        "en": "Tag Matching Mode",
    },
    substring: {
        "zh-TW": "部分匹配",
        "en": "Partial Match",
    },
    exact: {
        "zh-TW": "完全匹配",
        "en": "Exact Match",
    },

    sort: {
        "zh-TW": "排序",
        "en": "Sort",
    },
    default: {
        "zh-TW": "預設",
        "en": "Default",
    },
    imageCount: {
        "zh-TW": "圖片數量",
        "en": "Image Count",
    },
    random: {
        "zh-TW": "隨機",
        "en": "Random",
    },
    excludeCount: {
        "zh-TW": "排除圖片數量過少的角色",
        "en": "Exclude characters with too few images",
    },
    pageSize: {
        "zh-TW": "每頁圖片數量",
        "en": "Images Per Page",
    },
    ignorePrompts: {
        "zh-TW": "複製時忽略提示詞",
        "en": "Ignore Prompts When Copying",
    },
    moreOptions: {
        "zh-TW": "進階設定",
        "en": "More Options",
    },

    tooltipInclude: {
        "zh-TW": `
            <ul>
                <li>
                    查詢包含特定提示詞的角色，<br>
                    忽略大小寫和特殊符號，<br>
                    例如輸入 <span class="code">RED-eyes</span> 或 <span class="code">redeyes</span>，
                    都可以查詢到提示詞含有 <span class="code">red eyes</span> 的角色。
                </li>
                <li>
                    支援多組「and」查詢，查詢同時滿足所有條件的角色，<br>
                    使用 <span class="code">,</span> 或換行來分割，<br>
                    例如輸入 <span class="code">red hair, blue eyes</span> ，
                    表示查詢 紅頭髮 且 藍色眼睛 的角色。
                </li>
                <li>
                    支援多組「or」查詢，查詢滿足任一條件的角色<br>
                    使用 <span class="code">|</span>來分割，<br>
                    例如輸入 <span class="code">red eyes | blue eyes, short hair</span> ，<br>
                    表示查詢 短頭髮 且 眼睛是紅色或藍色 的角色。
                </li>
            </ul>
        `,
        "en": `
            <ul>
                <li>
                    Search for characters containing specific tags,<br>
                    ignoring case and special characters.<br>
                    For example, entering <span class="code">RED-eyes</span> or <span class="code">redeyes</span><br>
                    will match characters that include the tag <span class="code">red eyes</span>.                
                </li>
                <li>
                    Supports multiple "and" queries to find characters that match all conditions.<br>
                    Use <span class="code">,</span> or a newline to separate them.<br>
                    For example, entering <span class="code">red hair, blue eyes</span> will search for characters with both red hair and blue eyes.
                </li>
                <li>
                    Supports multiple "or" queries to find characters that match any condition.<br>
                    Use <span class="code">|</span> to separate them.<br>
                    For example, entering <span class="code">red eyes | blue eyes, short hair</span><br>
                    will search for characters with short hair and either red or blue eyes.
                </li>
            </ul>
        `,
    },
    tooltipExclude: {
        "zh-TW": `
            <ul>
                <li>
                    查詢不包含特定提示詞的角色，<br>
                    忽略大小寫和特殊符號，<br>
                    例如輸入 <span class="code">NO_humans</span>，
                    表示 提示詞含有 <span class="code">no humans</span> 的角色會被排除。
                </li>
                <li>
                    支援多組，滿足任意一條件的角色都會被排除，<br>
                    使用 <span class="code">,</span> 或換行來分割，<br>
                    例如輸入 <span class="code">red eyes, short hair</span> ，
                    表示 紅色眼睛 或 短頭髮 的角色都會被排除。
                </li>
            </ul>
        `,
        "en": `
            <ul>
                <li>
                    Search for characters that <strong>do not</strong> contain specific prompt words.<br>
                    Case-insensitive and special characters will be ignored.<br>
                    For example, entering <span class="code">NO_humans</span> will exclude characters with prompts like <span class="code">no humans</span>.
                </li>
                <li>
                    Supports multiple exclusion conditions; characters matching <strong>any</strong> of them will be excluded.<br>
                    Use <span class="code">,</span> or a newline to separate them.<br>
                    For example, entering <span class="code">red eyes, short hair</span> will exclude characters with red eyes <strong>or</strong> short hair.
                </li>
            </ul>
        `,
    },
    tooltipIgnorePrompts: {
        "zh-TW": `
            <ul>
                <li>
                    複製角色提示詞時，忽略指定的提示詞，<br>
                    忽略大小寫，允許使用 <span class="code">*</span> 來匹配任意字串，<br>
                    支援多組，使用 <span class="code">,</span> 或換行來分隔，<br>
                    例如輸入 <span class="code">1girl, *eyes</span>，
                    而角色提示詞是 <span class="code">1girl, blue eyes, red hair</span>，
                    那麼複製到提示詞就會是 <span class="code">red hair</span>。                     
                </li>
            </ul>
        `,
        "en": `
            <ul>
                <li>
                    When copying character prompts, specified prompt words can be ignored.<br>
                    Case-insensitive, and <span class="code">*</span> can be used to match any string.<br>
                    Supports multiple patterns, separated by <span class="code">,</span> or newline.<br>
                    For example, entering <span class="code">1girl, *eyes</span> and the character prompts are <span class="code">1girl, blue eyes, red hair</span>,<br>
                    the copied result will be <span class="code">red hair</span>.
                </li>
            </ul>
        `,
    },
    tooltipMatching: {
        "zh-TW": `
            <ul>
                <li>
                    部分匹配：<br>
                    輸入 <span class="code">red</span>，
                    可以匹配 <span class="code">red eyes</span> 或 <span class="code">red hair</span>。
                </li>
                <li>
                    完全匹配：<br>
                    輸入 <span class="code">red</span>，將查詢不到任何角色。<br>
                    必須完整輸入 <span class="code">red eyes</span> 或 <span class="code">red hair</span>。
                </li>
            </ul>
        `,
        "en": `
            <ul>
                <li>
                    Partial Match:<br>
                    Enter <span class="code">red</span> to match tags like <span class="code">red eyes</span> or <span class="code">red hair</span>.
                </li>
                <li>
                    Exact Match:<br>
                    Entering <span class="code">red</span> will not return any results.<br>
                    You must enter the full tag, such as <span class="code">red eyes</span> or <span class="code">red hair</span>.
                </li>
            </ul>
        `,
    },

    copyName: {
        "zh-TW": "複製角色名稱",
        "en": "Copy Character Name",
    },
    copySeries: {
        "zh-TW": "複製角色+作品名稱",
        "en": "Copy Character + Series Name",
    },
    copyPrompt: {
        "zh-TW": "複製提示詞",
        "en": "Copy Prompt",
    },

    noData: {
        "zh-TW": "沒有符合條件的資料",
        "en": "No data matching the criteria",
    },

    footer: {
        "zh-TW": `
            本專案所展示之AI生成圖片及角色名稱，其著作權皆屬於各原創作者及公司所有<br>
            本專案僅供技術展示及學術研究使用，無任何商業用途<br>
            若有權利人認為本專案之內容有侵權疑慮，請聯絡我們，我們將儘速下架相關資料
        `,
        "en": `
            All AI-generated images and character names displayed in this project remain the copyright of their original creators and companies.
            <br>
            This project is for technical demonstration and academic research purposes only, with no commercial use.
            <br>
            If any copyright holders believe that any content in this project may infringe their rights, please contact us and we will promptly remove the relevant materials.
        `,
    },
}
