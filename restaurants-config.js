// 餐廳配置 - 自動連接菜單圖片
// 使用方法：在 index.html 中引入此檔案，然後在初始化時使用 RESTAURANTS_CONFIG

const RESTAURANTS_CONFIG = [
    {
        name: "嘉李",
        category: "便當",
        img: "https://raw.githubusercontent.com/Lsjlsf/office-lunch-/main/嘉李菜單.jpg"
    },
    {
        name: "享蒔",
        category: "便當",
        img: "https://raw.githubusercontent.com/Lsjlsf/office-lunch-/main/享蒔菜單.jpg"
    },
    {
        name: "珍好鍋貼",
        category: "速食",
        img: "https://raw.githubusercontent.com/Lsjlsf/office-lunch-/main/珍好鍋貼.jpg"
    },
    {
        name: "東坡隱茶",
        category: "飲料",
        img: "https://raw.githubusercontent.com/Lsjlsf/office-lunch-/main/2025-12-08%EF%BC%8C%E6%9D%B1%E5%9D%A1%E9%9A%B1%E8%8C%B6%E8%8F%9C%E5%96%AE.jpg"
    },
    {
        name: "鄭姑媽",
        category: "麵食",
        img: "https://raw.githubusercontent.com/Lsjlsf/office-lunch-/main/2026.04.20%EF%BC%8C%E9%84%AD%E5%A7%91%E5%AA%BD.jpg"
    },
    {
        name: "昆陽食坊",
        category: "便當",
        img: "https://raw.githubusercontent.com/Lsjlsf/office-lunch-/main/2026.05.20%EF%BC%8C%E6%98%86%E9%99%BD%E9%A3%9F%E5%9D%8A%EF%BC%8C%E8%8F%9C%E5%96%AE.png"
    },
    {
        name: "泰好運",
        category: "其他",
        img: "https://raw.githubusercontent.com/Lsjlsf/office-lunch-/main/2026.05.21%EF%BC%8C%E6%9D%BE%E5%B1%B1%EF%BC%8C%E6%B3%B0%E5%A5%BD%E9%81%8B%E8%8F%9C%E5%96%AE.png"
    },
    {
        name: "炭味家",
        category: "速食",
        img: "https://raw.githubusercontent.com/Lsjlsf/office-lunch-/main/2026.5.29%EF%BC%8C%E7%82%AD%E5%91%B3%E5%AE%B6.jpg"
    },
    {
        name: "享奇雞",
        category: "便當",
        img: "https://raw.githubusercontent.com/Lsjlsf/office-lunch-/main/2026.06.04%EF%BC%8C%E4%BA%AB%E5%A5%87%E9%9B%9E%E8%8F%9C%E5%96%AE.jpg"
    },
    {
        name: "茶聚",
        category: "飲料",
        img: "https://raw.githubusercontent.com/Lsjlsf/office-lunch-/main/2026.06.04%EF%BC%8C%E8%8C%B6%E8%81%9A%E8%8F%9C%E5%96%AE%EF%BC%8C%E5%8D%97%E6%B8%AF%E7%8E%89%E6%88%90%E5%BA%97.jpg"
    }
];

// 自動初始化 localStorage（如果還沒有的話）
function initializeRestaurantsFromConfig() {
    const existing = localStorage.getItem('lunchRestaurants');
    if (!existing) {
        localStorage.setItem('lunchRestaurants', JSON.stringify(RESTAURANTS_CONFIG));
        console.log('✅ 已初始化餐廳配置');
    }
}

// 以下為介面改善：在管理設定清單顯示縮圖、檔名截斷，以及覆寫 renderSettingRestaurantList 的函式
(function() {
    // 注入額外 CSS（只注入一次）
    const STYLE_ID = 'rls-fix-style';
    if (!document.getElementById(STYLE_ID)) {
        const css = `
        /* 設定清單縮圖與截斷樣式 */
        .res-list { list-style-type: none; padding: 0; margin: 10px 0 0 0; }
        .res-list li { display: flex; align-items: center; justify-content: space-between; padding: 10px; border: 1px solid #eee; background: #fff; border-radius: 6px; margin-bottom: 8px; }
        .res-list .res-left { display:flex; align-items:center; gap:10px; min-width:0; }
        .res-list .thumb { width:80px; height:60px; object-fit:cover; border-radius:4px; margin-right:10px; }
        .res-list .thumb-placeholder { width:80px; height:60px; background:#f1f3f5; border-radius:4px; display:flex; align-items:center; justify-content:center; color:#888; margin-right:10px; }
        .res-list .meta { min-width:0; }
        .res-list .meta .filename { font-size:12px; color:#666; max-width:420px; white-space:nowrap; overflow:hidden; text-overflow:ellipsis; }
        .res-list .actions { display:flex; gap:8px; margin-left:12px; flex-shrink:0; }
        `;
        const s = document.createElement('style');
        s.id = STYLE_ID;
        s.textContent = css;
        document.head && document.head.appendChild(s);
    }

    // 覆寫全域的 renderSettingRestaurantList（index.html 中會呼叫此函式）
    window.renderSettingRestaurantList = function() {
        try {
            const listEl = document.getElementById('setting-res-list');
            if (!listEl) return;
            if (!Array.isArray(restaurantList) || restaurantList.length === 0) {
                listEl.innerHTML = '<li style="color:#888;">目前尚無名單，請在上方新增</li>';
                return;
            }

            listEl.innerHTML = restaurantList.map((res, index) => {
                const style = (typeof getCategoryStyle === 'function') ? getCategoryStyle(res.category || '未分類') : { bg:'#f1f3f5', text:'#333', border:'#ddd' };
                const safeName = (typeof escapeHTML === 'function') ? escapeHTML(res.name) : (res.name || '');
                const imgUrl = res.img || '';

                // 嘗試從 URL 取得檔名並 decode，若失敗顯示原始
                let imgFilename = '無圖片';
                if (imgUrl) {
                    try {
                        const u = new URL(imgUrl);
                        imgFilename = decodeURIComponent(u.pathname.split('/').pop() || imgUrl);
                    } catch (e) {
                        imgFilename = imgUrl;
                    }
                }

                const safeFilename = (typeof escapeHTML === 'function') ? escapeHTML(imgFilename) : imgFilename;
                const safeImg = (typeof escapeHTML === 'function') ? escapeHTML(imgUrl) : imgUrl;

                const imgHtml = imgUrl
                    ? `<img class="thumb" src="${safeImg}" alt="${safeName}" onerror="this.style.display='none'">`
                    : `<div class="thumb-placeholder">無圖</div>`;

                return `
                    <li>
                        <div class="res-left">
                            ${imgHtml}
                            <div class="meta">
                                <div><span class="store-badge" style="background: ${style.bg}; color: ${style.text}; border: 1px solid ${style.border}; font-size:11px; font-weight:bold; vertical-align:middle;">${(res.category? escapeHTML(res.category): '未分類')}</span> <strong style="margin-left:8px;">${safeName}</strong></div>
                                <div class="filename">${safeFilename}</div>
                            </div>
                        </div>
                        <div class="actions">
                            <button class="btn-edit" style="padding:6px 10px;" onclick="editRestaurant(${index})">修改</button>
                            <button class="btn-remove" style="padding:6px 10px;" onclick="removeRestaurant(${index})">刪除</button>
                        </div>
                    </li>
                `;
            }).join('');
        } catch (err) {
            console.warn('renderSettingRestaurantList override failed', err);
        }
    };
})();
