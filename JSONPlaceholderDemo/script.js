document.addEventListener('DOMContentLoaded', () => {
    const loadDataButton = document.getElementById('loadData');
    const dataDisplay = document.getElementById('dataDisplay');

    loadDataButton.addEventListener('click', () => {
        fetchData();
    });

    async function fetchData() {
        const url = 'https://jsonplaceholder.typicode.com/posts?_limit=5';

        try {
            const response = await fetch(url);
            if (!response.ok) {
                throw new Error('データの取得に失敗しました');
            }
            const posts = await response.json();
            displayData(posts);
        } catch (error) {
            console.error('エラー:', error);
            dataDisplay.textContent = 'エラーが発生しました。';
        }
    }

    function displayData(posts) {
        const content = posts.map(post => `
            <div class="post">
                <h3>${post.title}</h3>
                <p>${post.body}</p>
            </div>
        `).join('');

        dataDisplay.innerHTML = content;
    }
});
