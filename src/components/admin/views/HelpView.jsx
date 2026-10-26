export default function HelpView() {
    const helpQuestions = [
        {
            question: "What information is shown in Orders?",
            answer: "Orders show customer details, juice items, total amounts, and delivery statuses.",
        },
        {
            question: "What are farmer submissions?",
            answer: "These are applications from farmers who want to supply fruit, showing their fruit types, quantities, and application statuses.",
        },
        {
            question: "What does the Reports section show?",
            answer: "Reports show sample daily order counts and sales totals.",
        },
    ];

    return (
        <div style={{ padding: "30px", color: "#fff", width: "100%", boxSizing: "border-box" }}>
            <div style={{ borderBottom: "2px solid #333", paddingBottom: "16px", marginBottom: "20px" }}>
                <h2 style={{ color: "#ff7b00", margin: "0 0 6px 0" }}>Help</h2>
                <p style={{ color: "#aaa", margin: 0, fontSize: "0.95rem" }}>
                    Simple answers to common admin questions.
                </p>
            </div>

            <dl style={{ display: "flex", flexDirection: "column", gap: "16px", margin: 0 }}>
                {helpQuestions.map((item) => (
                    <div key={item.question} style={{ background: "#1e1e2f", border: "1px solid #2a2a3d", borderRadius: "10px", padding: "20px" }}>
                        <dt style={{ color: "#ff7b00", marginBottom: "8px", fontSize: "1rem", fontWeight: 700 }}>
                            {item.question}
                        </dt>
                        <dd style={{ color: "#bbb", margin: 0, fontSize: "0.92rem", lineHeight: 1.6 }}>
                            {item.answer}
                        </dd>
                    </div>
                ))}
            </dl>
        </div>
    );
}
