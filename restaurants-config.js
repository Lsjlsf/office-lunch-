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
