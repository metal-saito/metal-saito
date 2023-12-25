const API_KEY = 'YOUR API KEY';

const URL = "https://api.openai.com/v1/chat/completions";

async function reply() {
    try {
        const text = document.getElementById("request_text").value;
        if (!text) {
            // ユーザーからの入力が空白の場合のバリデーション
            console.log("ユーザーからの入力が空です。");
            return;
        }

        const response = await axios.post(
            URL,
            {
                "model": "gpt-3.5-turbo",
                "messages": [
                    { "role": "user", "content": text }
                ]
            },
            {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${API_KEY}`,
                },
            }
        );

        const chatgpt_response = response.data.choices[0].message.content;
        $("#response_text").val(chatgpt_response);
    } catch (error) {
        console.log("エラーが発生しました:", error);
        // ユーザーにエラーを通知する方法を追加
    }
}