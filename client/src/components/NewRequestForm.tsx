
import React, { useState } from 'react';
import axios from 'axios';
import { useCurrentUser } from '../App';

interface NewRequestFormProps {
    onClose: () => void;
    onAddFeature?: (feature: any) => void;
}

const MAX_TITLE = 100;

const NewRequestForm: React.FC<NewRequestFormProps> = ({ onClose, onAddFeature }) => {
    const [title, setTitle] = useState("");
    const [desc, setDesc] = useState("");
    const [loading, setLoading] = useState(false);
    const { user } = useCurrentUser();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!title.trim() || !desc.trim() || !user?.id) return;
        setLoading(true);
        try {
            const res = await axios.post(`${import.meta.env.VITE_API_URL}/features`, {
                title,
                description: desc,
                createdBy: user.id,
            });
            if (onAddFeature && res.data) {
                onAddFeature(res.data);
            }
            setTitle("");
            setDesc("");
            onClose();
        } catch (err) {
            // Optionally show error
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="w-full max-w-xl mx-auto">
            <div className="flex flex-col items-start mb-2">
                <h2 className="text-2xl font-bold text-right mb-1">הגש בקשה לפיצ'ר חדש</h2>
                <p className="text-gray-500 text-right text-sm mb-4">שתף את הרעיון שלך ועזור לנו לשפר את המוצר</p>
            </div>
            <form className="space-y-4" onSubmit={handleSubmit}>
                <div>
                    <label className="block text-right text-gray-700 font-medium mb-1">
                        כותרת הבקשה <span className="text-red-500">*</span>
                    </label>
                    <input
                        type="text"
                        className="w-full border border-gray-300 rounded-lg px-3 py-2 text-right focus:outline-none focus:ring-2 focus:ring-blue-200 transition"
                        placeholder="תאר את הבקשה בקצרה..."
                        maxLength={MAX_TITLE}
                        value={title}
                        onChange={e => setTitle(e.target.value)}
                    />
                    <div className="text-xs text-gray-400 text-left mt-1">{title.length}/{MAX_TITLE}</div>
                </div>
                <div>
                    <label className="block text-right text-gray-700 font-medium mb-1">
                        תיאור מפורט <span className="text-red-500">*</span>
                    </label>
                    <textarea
                        className="w-full border border-gray-300 rounded-lg px-3 py-2 text-right focus:outline-none focus:ring-2 focus:ring-blue-200 transition"
                        placeholder="הסבר מה הפיצ'ר אמור לעשות ולמה הוא חשוב..."
                        rows={4}
                        value={desc}
                        onChange={e => setDesc(e.target.value)}
                    ></textarea>
                    <div className="text-xs text-gray-400 text-right mt-1">
                        תאר את הבעיה שאתה מנסה לפתור והפתרון המוצע
                    </div>
                </div>
                                <div
                                    className="rounded-lg p-4 mt-8 border border-gray-100"
                                    style={{
                                        background: 'linear-gradient(90deg, #F4F6FB 0%, #E6E9F5 100%)'
                                    }}
                                >
                    <div className="flex items-center mb-2">
                        <svg className="w-5 h-5 ml-2" fill="none" viewBox="0 0 24 24">
                            <circle cx="12" cy="12" r="10" stroke="#4367e9" strokeWidth="2" fill="none" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 16h.01M12 8a2 2 0 0 1 2 2c0 1-2 1-2 3" stroke="#4367e9" />
                        </svg>
                        <span className="font-semibold" style={{ color: '#4367e9' }}>טיפים לבקשה טובה</span>
                    </div>
                    <ul className="pr-5 text-sm text-gray-600 space-y-1" style={{ listStyle: 'none', paddingRight: '1.25rem' }}>
                        <li style={{ display: 'flex', alignItems: 'flex-start' }}>
                            <span style={{ color: '#4367e9', fontSize: '1.2em', lineHeight: '1', marginLeft: 8, marginTop: 2 }}>&bull;</span>
                            <span>תאר את הבקשה לפי התוצאה - למה אתה צריך את זה?</span>
                        </li>
                        <li style={{ display: 'flex', alignItems: 'flex-start' }}>
                            <span style={{ color: '#4367e9', fontSize: '1.2em', lineHeight: '1', marginLeft: 8, marginTop: 2 }}>&bull;</span>
                            <span>הימנע מתיאורים טכניים של הפתרון בלבד</span>
                        </li>
                        <li style={{ display: 'flex', alignItems: 'flex-start' }}>
                            <span style={{ color: '#4367e9', fontSize: '1.2em', lineHeight: '1', marginLeft: 8, marginTop: 2 }}>&bull;</span>
                            <span>בדוק שאין כבר בקשה דומה קיימת</span>
                        </li>
                    </ul>
                </div>
                <div className="flex justify-end items-center mt-6 gap-2 flex-row">
                    <button
                        type="button"
                        onClick={onClose}
                        className="px-6 py-2 rounded-lg bg-white border border-gray-300 text-gray-700 font-medium hover:bg-gray-100 transition"
                        disabled={loading}
                    >
                        ביטול
                    </button>

                    <button
                        type="submit"
                        className="px-6 py-2 rounded-lg text-white font-semibold flex items-center gap-2 transition"
                        style={{
                            background: 'linear-gradient(90deg, #5B8CFF 0%, #A259FF 100%)'
                        }}
                        disabled={loading || !title.trim() || !desc.trim()}
                    >
                        <span className="text-lg">+</span>
                        {loading ? 'מגיש...' : 'שלח בקשה'}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default NewRequestForm;
