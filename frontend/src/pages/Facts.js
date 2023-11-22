import { useParams } from "react-router-dom";

/**
 * Get Fact section JSX
 * @returns JSX element to render for the Fact section information.
 */
function Facts() {
    const { employee } = useParams();

    return (
        <div>
            <h1>10 Password Statistics and Facts</h1>
            <p>We've collected the most interesting password facts and statistics based on recent studies</p>

            <div style={{ textAlign: "left", fontWeight: "bold", fontSize: "20px"}}>
                <ol>
                    <li>Passwords are used to authenticate and secure access to various digital systems, such as email accounts, online banking, social media, and more.</li>
                    <img width={800} height={400} src="/login.jpg" />
                    <li>A strong password typically includes a combination of uppercase and lowercase letters, numbers, and special characters.</li>
                    <img width={800} height={400} src="/strength.jpg" />
                    <li>Passwords should be unique for each online account to prevent unauthorized access. Using the same password across multiple accounts increases the risk of a security breach.</li>
                    <img width={800} height={400} src="/breach.png" />
                    <li>It is recommended to use a password manager to securely store and generate strong passwords for different accounts.</li>
                    <img width={800} height={400} src="/passwordmanager.png" />
                    <li>The length of a password is an important factor in its strength. Longer passwords are generally more secure than shorter ones.</li>
                    <img width={800} height={400} src="/long.png" />
                    <li>The use of common words, personal information, or sequential characters (e.g., "password123" or "123456") should be avoided, as they are easily guessable and vulnerable to brute-force attacks.</li>
                    <img width={800} height={400} src="/password.jpg" />
                    <li>Passwords should be changed periodically to reduce the risk of compromise. Experts often recommend changing passwords every three to six months.</li>
                    <img width={800} height={400} src="/expired.jpg" />
                    <li>Two-factor authentication (2FA) adds an extra layer of security by requiring users to provide an additional piece of information, such as a code sent to their mobile device, in addition to their password.</li>
                    <img width={800} height={400} src="/2FA.jpg" />
                    <li>Biometric authentication methods, such as fingerprint or facial recognition, are increasingly being used as alternatives or supplements to traditional passwords.</li>
                    <img width={800} height={400} src="/finger.jpg" />
                    <li>Continuous education and awareness about password security practices are essential to help individuals understand the risks and adopt good password hygiene to protect their accounts and personal information.</li>
                    <img width={800} height={400} src="/education.jpg" />
                </ol>
            </div>
        </div >
    );
}

export { Facts };