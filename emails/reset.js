const keys = require('../keys');
module.exports = function (user, token) {
    return {
        to: user.email,
        from: keys.EMAIL_FROM,
        subject: 'Resetting password',
        html: `
            <table style="border-collapse:collapse;margin:0 auto; font-family:'Open Sans',sans-serif;background:#fff;" bgcolor="#ee6e73" border="0" cellpadding="0"
            cellspacing="0" summary="layout table">
            <tbody>
                <tr>
                    <td height="50" bgcolor="#ffffff"></td>
                </tr>
                <tr>
                    <td align="center">
                        <table style="border-collapse:collapse;margin:0 auto;" bgcolor="#ee6e73" border="0"
                            cellpadding="0" cellspacing="0" width="600" summary="layoutS table">
                            <tbody>
                                <tr>
                                    <td height="25" bgcolor="#ffffff"></td>
                                </tr>
                                <tr>
                                    <td width="600" role="presentation" background="#26a69a" valign="top" style="padding:0;display:inline-block;max-width:600px;background-repeat:no-repeat;background-position:top center;background-size:cover;">
                                        <div>
                                            <table role="presentation" border="0" cellpadding="0" cellspacing="0" align="center" width="600" height="80" style="margin: auto; border-spacing:0;">
                                                <tbody>
                                                    <tr height="50">
                                                        <td align="center">
                                                            <img src="${keys.BASE_URL}/images/logo.png" alt="courseshop">
                                                        </td>
                                                    </tr>
                                                
                                                </tbody>
                                            </table>
                                        </div>
                                    </td>
                                </tr>
                                <tr>
                                    <td height="25" bgcolor="#ee6e73"></td>
                                </tr>
                                <tr>
                                    <td valign="top" align="center">
                                        <table style="border-collapse:collapse;margin:0 auto;" bgcolor="#ffffff"
                                            border="0" cellpadding="0" cellspacing="0" width="550"
                                            summary="layout table">
                                            <tbody>
                                                <tr>
                                                    <td>
                                                        <table style="border-collapse:collapse;margin:0 auto;"
                                                            bgcolor="#ffffff" border="0" cellpadding="0" cellspacing="0"
                                                            width="500" summary="layout table">
                                                            <tbody>
                                                                <tr>
                                                                    <td height="45"></td>
                                                                </tr>
                                                                <tr>
                                                                    <td align="left">
                                                                        <h2 style="margin: 0;font-size: 15px;color: rgb(57, 57, 57);font-weight: bold;line-height: 22px;">
                                                                            Dear ${user.name},</h2>
                                                                    </td>
                                                                </tr>
                                                                <tr>
                                                                    <td height="25"></td>
                                                                </tr>
                                                                <tr>
                                                                    <td align="left">
                                                                        <p style="margin: 0;font-size: 15px;color: rgb(57, 57, 57);line-height: 22px;">
                                                                            Thank you for shopping on our online store. We received a password reset request from you. 
                                                                            If not, ignore this letter. Or click link below.
                                                                        </p>
                                                                    </td>
                                                                </tr>
                                                                <tr>
                                                                    <td height="25"></td>
                                                                </tr>
                                                                <tr>
                                                                    <td align="left">
                                                                        <p style="margin: 0; font-size: 15px; color: rgb(57, 57, 57); line-height: 22px;">
                                                                            <a href="${keys.BASE_URL}/auth/password/${token}" style="color:#039be5">Reset password</a>                                                                        
                                                                        </p>
                                                                    </td>
                                                                </tr>
                                                                <tr>
                                                                    <td height="25"></td>
                                                                </tr>
                                                                <tr>
                                                                    <td align="left">
                                                                        <p style="margin: 0; font-size: 15px; color: rgb(57, 57, 57); line-height: 22px;">
                                                                            <a href="${keys.BASE_URL}" style="color:#039be5">Go to shop</a>                                                                        
                                                                        </p>
                                                                    </td>
                                                                </tr>
                                                                <tr>
                                                                    <td height="25"></td>
                                                                </tr>
                                                                <tr>
                                                                    <td align="left">
                                                                        <p style="margin: 0; font-size: 15px; color: rgb(57, 57, 57); line-height: 22px;">
                                                                            Kind regards,<br>
                                                                            the Courses Shop Team                                                                     
                                                                        </p>
                                                                    </td>
                                                                </tr>
                                                                <tr>
                                                                    <td height="45"></td>
                                                                </tr>
                                                                
                                                            </tbody>
                                                        </table>
                                                    </td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </td>
                                </tr>
                                <tr>
                                    <td height="25" bgcolor="#ee6e73"></td>
                                </tr>
                                <tr>
                                    <td align="left">
                                        <table style="border-collapse:collapse;margin:0 auto;" bgcolor="#ffffff"
                                            border="0" cellpadding="0" cellspacing="0" width="600"
                                            summary="layout table">
                                            <tbody>
                                                <tr>
                                                    <td height="20"></td>
                                                </tr>
                                                <tr>
                                                    <td align="center">
                                                        <p style="margin: 0; font-size: 13px; color: rgb(159, 157, 170); line-height: 22px;">
                                                            <b>Author phone: 0631800710</b>                                                             
                                                        </p>      
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td align="center">
                                                        <p style="margin: 0; font-size: 13px; color: rgb(159, 157, 170); line-height: 22px;">
                                                            <a href="mailto:vitia046@gmail.com" style="color:#039be5">vitia046@gmail.com</a>                                                      
                                                        </p>      
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td align="center">
                                                        <p style="margin: 0; font-size: 13px; color: rgb(159, 157, 170); line-height: 22px;">
                                                            <a href="https://www.linkedin.com/in/viktor-shchekotikhin-648840151/" style="color:#039be5">Linkedin</a>
                                                                                                           
                                                        </p>      
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td height="20"></td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </td>
                </tr>
            </tbody>
        </table>
        `
    }
};
