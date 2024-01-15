const API_KEY = 'YOUR API KEY';

const URL = "https://api.openai.com/v1/chat/completions";

function reply() {
    var text = document.getElementById("request_text").value;

    // メッセージが空の場合に警告メッセージを表示
    if (text.trim() === "") {
        document.getElementById("response_text").value = "メッセージを入力してください";
        return; // 処理を中断
    }
    document.getElementById("response_text").value = "応答を取得しています..."; // 処理中の状態を表示
    async function getResponse() {
        try {
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
            var chatgpt_response = response.data.choices[0].message.content;
            $("#response_text").val(chatgpt_response);
        } catch (error) {
            console.log(error);
            document.getElementById("response_text").value = "エラーが発生しました。もう一度試してください。";
        }
    }
    getResponse();
}
