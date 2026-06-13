import React, { useState } from 'react';
import axios from 'axios';
import { server_url } from './config/url';

const Payment = () => {
    const [loading, setLoading] = useState(false);
    const [customAmount, setCustomAmount] = useState(''); // Default starting value

    const handlePayment = async () => {
        // Validation: Ensure amount is at least 1
        if (!customAmount || parseFloat(customAmount) < 1) {
            alert("Please enter a valid donation amount.");
            return;
        }

        setLoading(true);
        try {
            // Logic updated to use customAmount state
            let url = server_url + "/user/order";
            const { data } = await axios.post(url, { amount: parseFloat(customAmount) }, {
                headers: { "Content-Type": "application/json" },
            });
            
            const options = {
                key: "rzp_test_Sm7EguLsqIfmVC", 
                amount: data.amount,
                currency: data.currency,
                name: "MediShare Relief", 
                description: "Fund for Life-Saving Medicines",
                image: "", 
                order_id: data.id, 
                theme: {
                    color: "#6366f1",
                },
                modal: {
                    backdropclose: false,
                },
                handler: async (response) => {
                    try {
                        let url = server_url + "/user/ordervalidate";
                        const { data: verifyData } = await axios.post(url, response);
                        alert("Bless you! " + verifyData.msg); 
                    } catch (error) {
                        alert("Payment verification failed!");
                    }
                },
                prefill: {
                    name: "Compassionate Donor",
                    email: "donor@example.com",
                    contact: "9999999999",
                },
            };

            const rzp = new window.Razorpay(options);
            rzp.open();

        } catch (error) {
            console.error("Error in payment flow", error);
            alert("Could not initiate payment.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div style={styles.overlayContainer}>
            <div style={styles.glassCard}>
                <div style={styles.iconBadge}>
                    <img 
                        src="https://cdn-icons-png.flaticon.com/512/3063/3063176.png" 
                        alt="Medicine" 
                        style={styles.logo} 
                    />
                </div>
                
                <h2 style={styles.title}>Empower Recovery</h2>
                <p style={styles.subtitle}>Choose an amount to help provide life-saving healthcare.</p>
                
                <div style={styles.donationBox}>
                    <span style={styles.label}>Enter Donation Amount (₹)</span>
                    <div style={styles.inputWrapper}>
                        <span style={styles.currencySymbol}>₹</span>
                        <input 
                            type="number" 
                            value={customAmount}
                            onChange={(e) => setCustomAmount(e.target.value)}
                            style={styles.amountInput}
                            placeholder="0"
                            min="1"
                        />
                    </div>
                    <p style={styles.impactText}>Every Rupee makes a difference</p>
                </div>

                <button 
                    onClick={handlePayment} 
                    disabled={loading}
                    onMouseEnter={(e) => (e.target.style.transform = 'translateY(-2px)')}
                    onMouseLeave={(e) => (e.target.style.transform = 'translateY(0)')}
                    style={{
                        ...styles.button,
                        background: loading 
                            ? 'linear-gradient(90deg, #bdc3c7, #95a5a6)' 
                            : 'linear-gradient(135deg, #6366f1 0%, #a855f7 100%)'
                    }}
                >
                    {loading ? "Preparing Secure Gateway..." : `Donate ₹${customAmount || 0} Now`}
                </button>
                
                <div style={styles.footer}>
                    <img src="https://img.icons8.com/ios-filled/50/ffffff/shield.png" style={styles.shieldIcon} alt="secure" />
                    <span>Secure Encryption via Razorpay</span>
                </div>
            </div>
        </div>
    );
};

const styles = {
    overlayContainer: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100vh',
        width: '100%',
        backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), url('https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&q=80&w=2070')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        fontFamily: "'Inter', system-ui, sans-serif",
    },
    glassCard: {
        background: 'rgba(255, 255, 255, 0.15)',
        backdropFilter: 'blur(12px)',
        WebkitBackdropFilter: 'blur(12px)',
        border: '1px solid rgba(255, 255, 255, 0.2)',
        padding: '40px',
        borderRadius: '28px',
        width: '400px',
        textAlign: 'center',
        color: '#fff',
        boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)',
    },
    iconBadge: {
        background: '#fff',
        width: '80px',
        height: '80px',
        borderRadius: '50%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        margin: '0 auto 20px',
    },
    logo: { width: '45px', height: '45px' },
    title: { fontSize: '26px', fontWeight: '700', margin: '0 0 10px' },
    subtitle: { fontSize: '14px', color: 'rgba(255, 255, 255, 0.8)', marginBottom: '25px' },
    donationBox: {
        background: 'rgba(0, 0, 0, 0.3)',
        borderRadius: '16px',
        padding: '20px',
        marginBottom: '25px',
    },
    label: { fontSize: '11px', textTransform: 'uppercase', color: 'rgba(255, 255, 255, 0.6)' },
    inputWrapper: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '5px',
        margin: '10px 0',
    },
    currencySymbol: { fontSize: '28px', fontWeight: 'bold' },
    amountInput: {
        background: 'transparent',
        border: 'none',
        borderBottom: '2px solid #6366f1',
        color: '#fff',
        fontSize: '32px',
        fontWeight: 'bold',
        width: '150px',
        textAlign: 'center',
        outline: 'none',
    },
    impactText: { fontSize: '12px', color: '#4ade80', marginTop: '10px' },
    button: {
        width: '100%',
        padding: '16px',
        color: '#fff',
        border: 'none',
        borderRadius: '14px',
        fontSize: '18px',
        fontWeight: '600',
        cursor: 'pointer',
        transition: 'all 0.3s ease',
    },
    footer: { display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', marginTop: '20px', fontSize: '11px', color: 'rgba(255, 255, 255, 0.5)' },
    shieldIcon: { width: '14px', opacity: '0.6' }
};

export default Payment;