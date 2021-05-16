module.exports ={
    getAccountActivationTemplate(username, link,accountType) {
        const html='<!DOCTYPE html>' +
            '<html lang="he" data-textdirection="rtl">' +
            '<head>' +
            '    <title></title>' +
            '    <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />' +
            '    <meta name="viewport" content="width=device-width, initial-scale=1">' +
            '    <meta http-equiv="X-UA-Compatible" content="IE=edge" />' +
            '    <style type="text/css">' +
            '        @media screen {' +
            '            @font-face {' +
            '                font-family: \'Lato\';' +
            '                font-style: normal;' +
            '                font-weight: 400;' +
            '                src: local(\'Lato Regular\'), local(\'Lato-Regular\'), url(https://fonts.gstatic.com/s/lato/v11/qIIYRU-oROkIk8vfvxw6QvesZW2xOQ-xsNqO47m55DA.woff) format(\'woff\');' +
            '            }' +
            '' +
            '            @font-face {' +
            '                font-family: \'Lato\';' +
            '                font-style: normal;' +
            '                font-weight: 700;' +
            '                src: local(\'Lato Bold\'), local(\'Lato-Bold\'), url(https://fonts.gstatic.com/s/lato/v11/qdgUG4U09HnJwhYI-uK18wLUuEpTyoUstqEm5AMlJo4.woff) format(\'woff\');' +
            '            }' +
            '' +
            '            @font-face {' +
            '                font-family: \'Lato\';' +
            '                font-style: italic;' +
            '                font-weight: 400;' +
            '                src: local(\'Lato Italic\'), local(\'Lato-Italic\'), url(https://fonts.gstatic.com/s/lato/v11/RYyZNoeFgb0l7W3Vu1aSWOvvDin1pK8aKteLpeZ5c0A.woff) format(\'woff\');' +
            '            }' +
            '' +
            '            @font-face {' +
            '                font-family: \'Lato\';' +
            '                font-style: italic;' +
            '                font-weight: 700;' +
            '                src: local(\'Lato Bold Italic\'), local(\'Lato-BoldItalic\'), url(https://fonts.gstatic.com/s/lato/v11/HkF_qI1x_noxlxhrhMQYELO3LdcAZYWl9Si6vvxL-qU.woff) format(\'woff\');' +
            '            }' +
            '        }' +
            '' +
            '        /* CLIENT-SPECIFIC STYLES */' +
            '        body,' +
            '        table,' +
            '        td,' +
            '        a {' +
            '            -webkit-text-size-adjust: 100%;' +
            '            -ms-text-size-adjust: 100%;' +
            '        }' +
            '' +
            '        table,' +
            '        td {' +
            '            mso-table-lspace: 0pt;' +
            '            mso-table-rspace: 0pt;' +
            '        }' +
            '' +
            '        img {' +
            '            -ms-interpolation-mode: bicubic;' +
            '        }' +
            '' +
            '        /* RESET STYLES */' +
            '        img {' +
            '            border: 0;' +
            '            height: auto;' +
            '            line-height: 100%;' +
            '            outline: none;' +
            '            text-decoration: none;' +
            '        }' +
            '' +
            '        table {' +
            '            border-collapse: collapse !important;' +
            '        }' +
            '' +
            '        body {' +
            '            height: 100% !important;' +
            '            margin: 0 !important;' +
            '            padding: 0 !important;' +
            '            width: 100% !important;' +
            '        }' +
            '' +
            '        /* iOS BLUE LINKS */' +
            '        a[x-apple-data-detectors] {' +
            '            color: inherit !important;' +
            '            text-decoration: none !important;' +
            '            font-size: inherit !important;' +
            '            font-family: inherit !important;' +
            '            font-weight: inherit !important;' +
            '            line-height: inherit !important;' +
            '        }' +
            '' +
            '        /* MOBILE STYLES */' +
            '        @media screen and (max-width:600px) {' +
            '            h1 {' +
            '                font-size: 32px !important;' +
            '                line-height: 32px !important;' +
            '            }' +
            '        }' +
            '' +
            '        /* ANDROID CENTER FIX */' +
            '        div[style*="margin: 16px 0;"] {' +
            '            margin: 0 !important;' +
            '        }' +
            '    </style>' +
            '</head>' +
            '' +
            '<body style="background-color: #f4f4f4; margin: 0 !important; padding: 0 !important;">' +
            '    <!-- HIDDEN PREHEADER TEXT -->' +
            '    <div style="display: none; font-size: 1px; color: #fefefe; line-height: 1px; font-family: \'Lato\', Helvetica, Arial, sans-serif; max-height: 0px; max-width: 0px; opacity: 0; overflow: hidden;"></div>' +
            '    <table border="0" cellpadding="0" cellspacing="0" width="100%">' +
            '        <!-- LOGO -->' +
            '        <tr>' +
            '            <td bgcolor="#1d2b36" align="center">' +
            '                <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px;">' +
            '                    <tr>' +
            '                        <td align="center" valign="top" style="padding: 40px 10px 40px 10px;"> </td>' +
            '                    </tr>' +
            '                </table>' +
            '            </td>' +
            '        </tr>' +
            '        <tr>' +
            '            <td bgcolor="#1d2b36" align="center" style="padding: 0px 10px 0px 10px;">' +
            '                <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px;">' +
            '                    <tr>' +
            '                        <td bgcolor="#ffffff" align="center" valign="top" style="padding: 40px 20px 20px 20px; border-radius: 4px 4px 0px 0px; color: #111111; font-family: \'Lato\', Helvetica, Arial, sans-serif; font-size: 48px; font-weight: 400; letter-spacing: 4px; line-height: 48px;">' +
            '                            <h1 style="font-size: 48px; font-weight: 400; margin: 2;"></h1> <img src="https://firebasestorage.googleapis.com/v0/b/notes-207711.appspot.com/o/images%2Fmeshi-full-icon-small.jpg?alt=media&token=150fc589-a7f6-49e3-b355-d8d2cbec1d2e" width="125" height="120" style="display: block; border: 0px;" />' +
            '                        </td>' +
            '                    </tr>' +
            '                </table>' +
            '            </td>' +
            '        </tr>' +
            '        <tr>' +
            '            <td bgcolor="#f4f4f4" align="center" style="padding: 0px 10px 0px 10px;">' +
            '                <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px;">' +
            '                    <tr>' +
            '                        <td bgcolor="#ffffff" align="left" style="padding: 20px 30px 40px 30px; color: #666666; font-family: \'Lato\', Helvetica, Arial, sans-serif; font-size: 18px; font-weight: 400; line-height: 25px;">' +
            // "<p style=\"margin: 0; text-align: right;\">"+"שלום "+username+" ברכות על הצטרפותך "+"!"+"<br>"+"סוג חשבונך: "+accountType+"<br>"+"להפעלת חשבונך אנא אמת את כתובת האימייל על ידי לחיצה על הכפתור. "+
            // "</p>" +
            "<p style=\"margin: 0; text-align: right;\">"+"תודה שנרשמת לאתר Meshi מעבדות.<br>" +

            "לתשומת לבך:" +
            "בעת מכירת מכשיר ללקוח חובה למלא את כל פרטי הלקוח  ולסרוק את חשבונית הקניה/תעודת האחריות.<br>" +
            "מומלץ לרשום כתובת מייל של הלקוח בכדי שהלקוח יקבל מייל על הרכישה עם שם החנות ופרטי האחריות." +
            "" +
            "בברכה, צוות Meshi מעבדות ⚒️🔬."+
            "</p>" +

            '                        </td>' +
            '                    </br>' +
            '                    <tr>' +
            '                        <td bgcolor="#ffffff" align="left">' +
            '                            <table width="100%" border="0" cellspacing="0" cellpadding="0">' +
            '                                <tr>' +
            '                                    <td bgcolor="#ffffff" align="center" style="padding: 20px 30px 60px 30px;">' +
            '                                        <table border="0" cellspacing="0" cellpadding="0">' +
            '                                            <tr>' +
            '                                                <td align="center" style="border-radius: 3px;" bgcolor="#8eacbb"><a href=\"'+link+'\"'+'target="_blank" style="font-size: 20px; font-family: Helvetica, Arial, sans-serif; color: #ffffff; text-decoration: none; color: #ffffff; text-decoration: none; padding: 15px 25px; border-radius: 2px; border: 1px solid #8eacbb; display: inline-block;">אימות חשבון</a></td>' +
            '                                            </tr>' +
            '                                        </table>' +
            '                                    </td>' +
            '                                </tr>' +
            '                            </table>' +
            '                        </td>' +
            '                    </tr> <!-- COPY -->' +
            '                    <tr>' +
            '                        <td bgcolor="#ffffff" align="left" style="padding: 0px 30px 0px 30px; color: #666666; font-family: \'Lato\', Helvetica, Arial, sans-serif; font-size: 18px; font-weight: 400; line-height: 25px;">' +
            '                            <p style="margin: 0; text-align: right;">במידה ולחיצה על הכפתור לא עובדת אנא העתק את הקישור הבא לדפדפן</p>' +
            '                        </td>' +
            '                    </tr> <!-- COPY -->' +
            '                    <tr>' +
            '                        <td bgcolor="#ffffff" align="left" style="padding: 20px 30px 20px 30px; color: #666666; font-family: \'Lato\', Helvetica, Arial, sans-serif; font-size: 18px; font-weight: 400; line-height: 25px;">' +
            " <p style=\"margin: 0;  text-align: right;\"><a href=\""+link+"\" target=\"_blank\" style=\"color: #b8e2ae;\">"+link+"</a></p>" +
            '                        </td>' +
            '                    </tr>' +
            '                    <tr>' +
            '                        <td bgcolor="#ffffff" align="left" style="padding: 0px 30px 20px 30px; color: #666666; font-family: \'Lato\', Helvetica, Arial, sans-serif; font-size: 18px; font-weight: 400; line-height: 25px;">' +
            '                            <p style="margin: 0; text-align: right; text-align: right;">בברכה, צוות משי מעבדות.</p>' +
            '                        </td>' +
            '                    </tr>' +
            '                    <tr>' +
            '                    </tr>' +
            '                </table>' +
            '            </td>' +
            '        </tr>' +
            '        <tr>' +
            '            <td bgcolor="#f4f4f4" align="center" style="padding: 30px 10px 0px 10px;">' +
            '                <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px;">' +
            '                    <tr>' +
            '                       ' +
            '                    </tr>' +
            '                </table>' +
            '            </td>' +
            '        </tr>' +
            '        <tr>' +
            '            <td bgcolor="#f4f4f4" align="center" style="padding: 0px 10px 0px 10px;">' +
            '                <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px;">' +
            '                    <tr>' +
            '                        ' +
            '                    </tr>' +
            '                </table>' +
            '            </td>' +
            '        </tr>' +
            '    </table>' +
            '</body>' +
            '' +
            '</html>';
        return html;
    },
    getPasswordResetEmail(username, link) {
        const html='<!DOCTYPE html>' +
            '<html lang="he" data-textdirection="rtl">' +
            '' +
            '<head>' +
            '    <title></title>' +
            '    <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />' +
            '    <meta name="viewport" content="width=device-width, initial-scale=1">' +
            '    <meta http-equiv="X-UA-Compatible" content="IE=edge" />' +
            '    <style type="text/css">' +
            '        @media screen {' +
            '            @font-face {' +
            '                font-family: \'Lato\';' +
            '                font-style: normal;' +
            '                font-weight: 400;' +
            '                src: local(\'Lato Regular\'), local(\'Lato-Regular\'), url(https://fonts.gstatic.com/s/lato/v11/qIIYRU-oROkIk8vfvxw6QvesZW2xOQ-xsNqO47m55DA.woff) format(\'woff\');' +
            '            }' +
            '' +
            '            @font-face {' +
            '                font-family: \'Lato\';' +
            '                font-style: normal;' +
            '                font-weight: 700;' +
            '                src: local(\'Lato Bold\'), local(\'Lato-Bold\'), url(https://fonts.gstatic.com/s/lato/v11/qdgUG4U09HnJwhYI-uK18wLUuEpTyoUstqEm5AMlJo4.woff) format(\'woff\');' +
            '            }' +
            '' +
            '            @font-face {' +
            '                font-family: \'Lato\';' +
            '                font-style: italic;' +
            '                font-weight: 400;' +
            '                src: local(\'Lato Italic\'), local(\'Lato-Italic\'), url(https://fonts.gstatic.com/s/lato/v11/RYyZNoeFgb0l7W3Vu1aSWOvvDin1pK8aKteLpeZ5c0A.woff) format(\'woff\');' +
            '            }' +
            '' +
            '            @font-face {' +
            '                font-family: \'Lato\';' +
            '                font-style: italic;' +
            '                font-weight: 700;' +
            '                src: local(\'Lato Bold Italic\'), local(\'Lato-BoldItalic\'), url(https://fonts.gstatic.com/s/lato/v11/HkF_qI1x_noxlxhrhMQYELO3LdcAZYWl9Si6vvxL-qU.woff) format(\'woff\');' +
            '            }' +
            '        }' +
            '' +
            '        /* CLIENT-SPECIFIC STYLES */' +
            '        body,' +
            '        table,' +
            '        td,' +
            '        a {' +
            '            -webkit-text-size-adjust: 100%;' +
            '            -ms-text-size-adjust: 100%;' +
            '        }' +
            '' +
            '        table,' +
            '        td {' +
            '            mso-table-lspace: 0pt;' +
            '            mso-table-rspace: 0pt;' +
            '        }' +
            '' +
            '        img {' +
            '            -ms-interpolation-mode: bicubic;' +
            '        }' +
            '' +
            '        /* RESET STYLES */' +
            '        img {' +
            '            border: 0;' +
            '            height: auto;' +
            '            line-height: 100%;' +
            '            outline: none;' +
            '            text-decoration: none;' +
            '        }' +
            '' +
            '        table {' +
            '            border-collapse: collapse !important;' +
            '        }' +
            '' +
            '        body {' +
            '            height: 100% !important;' +
            '            margin: 0 !important;' +
            '            padding: 0 !important;' +
            '            width: 100% !important;' +
            '        }' +
            '' +
            '        /* iOS BLUE LINKS */' +
            '        a[x-apple-data-detectors] {' +
            '            color: inherit !important;' +
            '            text-decoration: none !important;' +
            '            font-size: inherit !important;' +
            '            font-family: inherit !important;' +
            '            font-weight: inherit !important;' +
            '            line-height: inherit !important;' +
            '        }' +
            '' +
            '        /* MOBILE STYLES */' +
            '        @media screen and (max-width:600px) {' +
            '            h1 {' +
            '                font-size: 32px !important;' +
            '                line-height: 32px !important;' +
            '            }' +
            '        }' +
            '' +
            '        /* ANDROID CENTER FIX */' +
            '        div[style*="margin: 16px 0;"] {' +
            '            margin: 0 !important;' +
            '        }' +
            '    </style>' +
            '</head>' +
            '' +
            '<body style="background-color: #f4f4f4; margin: 0 !important; padding: 0 !important;">' +
            '    <!-- HIDDEN PREHEADER TEXT -->' +
            '    <div style="display: none; font-size: 1px; color: #fefefe; line-height: 1px; font-family: \'Lato\', Helvetica, Arial, sans-serif; max-height: 0px; max-width: 0px; opacity: 0; overflow: hidden;">בקשתך לאיפוס סיסמא</div>' +
            '    <table border="0" cellpadding="0" cellspacing="0" width="100%">' +
            '        <!-- LOGO -->' +
            '        <tr>' +
            '            <td bgcolor="#1d2b36" align="center">' +
            '                <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px;">' +
            '                    <tr>' +
            '                        <td align="center" valign="top" style="padding: 40px 10px 40px 10px;"> </td>' +
            '                    </tr>' +
            '                </table>' +
            '            </td>' +
            '        </tr>' +
            '        <tr>' +
            '            <td bgcolor="#1d2b36" align="center" style="padding: 0px 10px 0px 10px;">' +
            '                <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px;">' +
            '                    <tr>' +
            '                        <td bgcolor="#ffffff" align="center" valign="top" style="padding: 40px 20px 20px 20px; border-radius: 4px 4px 0px 0px; color: #111111; font-family: \'Lato\', Helvetica, Arial, sans-serif; font-size: 48px; font-weight: 400; letter-spacing: 4px; line-height: 48px;">' +
            '                            <h1 style="font-size: 48px; font-weight: 400; margin: 2;"></h1> <img src="https://firebasestorage.googleapis.com/v0/b/notes-207711.appspot.com/o/images%2Fmeshi-full-icon-small.jpg?alt=media&token=150fc589-a7f6-49e3-b355-d8d2cbec1d2e" width="125" height="120" style="display: block; border: 0px;" />' +
            '                        </td>' +
            '                    </tr>' +
            '                </table>' +
            '            </td>' +
            '        </tr>' +
            '        <tr>' +
            '            <td bgcolor="#f4f4f4" align="center" style="padding: 0px 10px 0px 10px;">' +
            '                <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px;">' +
            '                    <tr>' +
            '                        <td bgcolor="#ffffff" align="left" style="padding: 20px 30px 40px 30px; color: #666666; font-family: \'Lato\', Helvetica, Arial, sans-serif; font-size: 18px; font-weight: 400; line-height: 25px;">' +
            '                            <p style="margin: 0; text-align: right;">שלום בקשתך לאפס סיסמה ' +username+
            '</p>' +
            '                        </td>' +
            '                    </tr>' +
            '                    <tr>' +
            '                        <td bgcolor="#ffffff" align="left">' +
            '                            <table width="100%" border="0" cellspacing="0" cellpadding="0">' +
            '                                <tr>' +
            '                                    <td bgcolor="#ffffff" align="center" style="padding: 20px 30px 60px 30px;">' +
            '                                        <table border="0" cellspacing="0" cellpadding="0">' +
            '                                            <tr>' +
            '                                                <td align="center" style="border-radius: 3px;" bgcolor="#8eacbb"><a href=\"'+link+'\"'+'target="_blank" style="font-size: 20px; font-family: Helvetica, Arial, sans-serif; color: #ffffff; text-decoration: none; color: #ffffff; text-decoration: none; padding: 15px 25px; border-radius: 2px; border: 1px solid #8eacbb; display: inline-block;">איפוס סיסמא</a></td>' +
            '                                            </tr>' +
            '                                        </table>' +
            '                                    </td>' +
            '                                </tr>' +
            '                            </table>' +
            '                        </td>' +
            '                    </tr> <!-- COPY -->' +
            '                    <tr>' +
            '                        <td bgcolor="#ffffff" align="left" style="padding: 0px 30px 0px 30px; color: #666666; font-family: \'Lato\', Helvetica, Arial, sans-serif; font-size: 18px; font-weight: 400; line-height: 25px;">' +
            '                            <p style="margin: 0;  text-align: right;">במידה ולחיצה על הכפתור לא עובדת אנא העתק את הקישור הבא לדפדפן</p>' +
            '                        </td>' +
            '                    </tr> <!-- COPY -->' +
            '                    <tr>' +
            '                        <td bgcolor="#ffffff" align="left" style="padding: 20px 30px 20px 30px; color: #666666; font-family: \'Lato\', Helvetica, Arial, sans-serif; font-size: 18px; font-weight: 400; line-height: 25px;">' +
           " <p style=\"margin: 0;  text-align: right;\"><a href=\""+link+"\" target=\"_blank\" style=\"color: #b8e2ae;\">"+link+"</a></p>" +
            '                        </td>' +
            '                    </tr>' +
            '                    <tr>' +
            '                        <td bgcolor="#ffffff" align="left" style="padding: 0px 30px 20px 30px; color: #666666; font-family: \'Lato\', Helvetica, Arial, sans-serif; font-size: 18px; font-weight: 400; line-height: 25px;">' +
            '                            <p style="margin: 0;  text-align: right;"></p>' +
            '                        </td>' +
            '                    </tr>' +
            '                    <tr>' +
            '                    </tr>' +
            '                </table>' +
            '            </td>' +
            '        </tr>' +
            '        <tr>' +
            '            <td bgcolor="#f4f4f4" align="center" style="padding: 30px 10px 0px 10px;">' +
            '                <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px;">' +
            '                    <tr>' +
            '                       ' +
            '                    </tr>' +
            '                </table>' +
            '            </td>' +
            '        </tr>' +
            '        <tr>' +
            '            <td bgcolor="#f4f4f4" align="center" style="padding: 0px 10px 0px 10px;">' +
            '                <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px;">' +
            '                    <tr>' +
            '                        ' +
            '                    </tr>' +
            '                </table>' +
            '            </td>' +
            '        </tr>' +
            '    </table>' +
            '</body>' +
            '' +
            '</html>';
        return html;
    },
    getWarrantyActivatedEmail(name,date,model,storeName) {
        const html='<!DOCTYPE html>' +
            '<html lang="he" data-textdirection="rtl">' +
            '<head>' +
            '    <title></title>' +
            '    <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />' +
            '    <meta name="viewport" content="width=device-width, initial-scale=1">' +
            '    <meta http-equiv="X-UA-Compatible" content="IE=edge" />' +
            '    <style type="text/css">' +
            '        @media screen {' +
            '            @font-face {' +
            '                font-family: \'Lato\';' +
            '                font-style: normal;' +
            '                font-weight: 400;' +
            '                src: local(\'Lato Regular\'), local(\'Lato-Regular\'), url(https://fonts.gstatic.com/s/lato/v11/qIIYRU-oROkIk8vfvxw6QvesZW2xOQ-xsNqO47m55DA.woff) format(\'woff\');' +
            '            }' +
            '' +
            '            @font-face {' +
            '                font-family: \'Lato\';' +
            '                font-style: normal;' +
            '                font-weight: 700;' +
            '                src: local(\'Lato Bold\'), local(\'Lato-Bold\'), url(https://fonts.gstatic.com/s/lato/v11/qdgUG4U09HnJwhYI-uK18wLUuEpTyoUstqEm5AMlJo4.woff) format(\'woff\');' +
            '            }' +
            '' +
            '            @font-face {' +
            '                font-family: \'Lato\';' +
            '                font-style: italic;' +
            '                font-weight: 400;' +
            '                src: local(\'Lato Italic\'), local(\'Lato-Italic\'), url(https://fonts.gstatic.com/s/lato/v11/RYyZNoeFgb0l7W3Vu1aSWOvvDin1pK8aKteLpeZ5c0A.woff) format(\'woff\');' +
            '            }' +
            '' +
            '            @font-face {' +
            '                font-family: \'Lato\';' +
            '                font-style: italic;' +
            '                font-weight: 700;' +
            '                src: local(\'Lato Bold Italic\'), local(\'Lato-BoldItalic\'), url(https://fonts.gstatic.com/s/lato/v11/HkF_qI1x_noxlxhrhMQYELO3LdcAZYWl9Si6vvxL-qU.woff) format(\'woff\');' +
            '            }' +
            '        }' +
            '' +
            '        /* CLIENT-SPECIFIC STYLES */' +
            '        body,' +
            '        table,' +
            '        td,' +
            '        a {' +
            '            -webkit-text-size-adjust: 100%;' +
            '            -ms-text-size-adjust: 100%;' +
            '        }' +
            '' +
            '        table,' +
            '        td {' +
            '            mso-table-lspace: 0pt;' +
            '            mso-table-rspace: 0pt;' +
            '        }' +
            '' +
            '        img {' +
            '            -ms-interpolation-mode: bicubic;' +
            '        }' +
            '' +
            '        /* RESET STYLES */' +
            '        img {' +
            '            border: 0;' +
            '            height: auto;' +
            '            line-height: 100%;' +
            '            outline: none;' +
            '            text-decoration: none;' +
            '        }' +
            '' +
            '        table {' +
            '            border-collapse: collapse !important;' +
            '        }' +
            '' +
            '        body {' +
            '            height: 100% !important;' +
            '            margin: 0 !important;' +
            '            padding: 0 !important;' +
            '            width: 100% !important;' +
            '        }' +
            '' +
            '        /* iOS BLUE LINKS */' +
            '        a[x-apple-data-detectors] {' +
            '            color: inherit !important;' +
            '            text-decoration: none !important;' +
            '            font-size: inherit !important;' +
            '            font-family: inherit !important;' +
            '            font-weight: inherit !important;' +
            '            line-height: inherit !important;' +
            '        }' +
            '' +
            '        /* MOBILE STYLES */' +
            '        @media screen and (max-width:600px) {' +
            '            h1 {' +
            '                font-size: 32px !important;' +
            '                line-height: 32px !important;' +
            '            }' +
            '        }' +
            '' +
            '        /* ANDROID CENTER FIX */' +
            '        div[style*="margin: 16px 0;"] {' +
            '            margin: 0 !important;' +
            '        }' +
            '    </style>' +
            '</head>' +
            '' +
            '<body style="background-color: #f4f4f4; margin: 0 !important; padding: 0 !important;">' +
            '    <!-- HIDDEN PREHEADER TEXT -->' +
            '    <div style="display: none; font-size: 1px; color: #fefefe; line-height: 1px; font-family: \'Lato\', Helvetica, Arial, sans-serif; max-height: 0px; max-width: 0px; opacity: 0; overflow: hidden;"></div>' +
            '    <table border="0" cellpadding="0" cellspacing="0" width="100%">' +
            '        <!-- LOGO -->' +
            '        <tr>' +
            '            <td bgcolor="#1d2b36" align="center">' +
            '                <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px;">' +
            '                    <tr>' +
            '                        <td align="center" valign="top" style="padding: 40px 10px 40px 10px;"> </td>' +
            '                    </tr>' +
            '                </table>' +
            '            </td>' +
            '        </tr>' +
            '        <tr>' +
            '            <td bgcolor="#1d2b36" align="center" style="padding: 0px 10px 0px 10px;">' +
            '                <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px;">' +
            '                    <tr>' +
            '                        <td bgcolor="#ffffff" align="center" valign="top" style="padding: 40px 20px 20px 20px; border-radius: 4px 4px 0px 0px; color: #111111; font-family: \'Lato\', Helvetica, Arial, sans-serif; font-size: 48px; font-weight: 400; letter-spacing: 4px; line-height: 48px;">' +
            '                            <h1 style="font-size: 48px; font-weight: 400; margin: 2;"></h1> <img src="https://firebasestorage.googleapis.com/v0/b/notes-207711.appspot.com/o/images%2Fmeshi-full-icon-small.jpg?alt=media&token=150fc589-a7f6-49e3-b355-d8d2cbec1d2e" width="125" height="120" style="display: block; border: 0px;" />' +
            '                        </td>' +
            '                    </tr>' +
            '                </table>' +
            '            </td>' +
            '        </tr>' +
            '        <tr>' +
            '            <td bgcolor="#f4f4f4" align="center" style="padding: 0px 10px 0px 10px;">' +
            '                <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px;">' +
            '                    <tr>' +
            '                        <td bgcolor="#ffffff" align="left" style="padding: 20px 30px 40px 30px; color: #666666; font-family: \'Lato\', Helvetica, Arial, sans-serif; font-size: 18px; font-weight: 400; line-height: 25px;">' +
            "<p style=\"margin: 0; text-align: right;\">" +
            "שלום "+name+"."+"<br>"+
            " תודה שרכשת מכשיר מסוג: "+model+"<br>" +
            "בסניף: "+storeName+"."+"<br>" +
            "האחריות הופעלה ותקפה עד לתאריך: "+date+"<br>" +
            "מצורף קישור לאתרנו ובו מידע על סניפים ושעות פעילות בהם ניתנת אחריות על המכשיר אשר רכשת"+"<br>"+
            ""+".בברכה, צוות משי מעבדות"+
            "</p>" +"<a href=\"https://meshilabs.com/branches\">https://meshilabs.com/branches</a>"
            '                        </td>' +
            '                    </tr>' +
            '                    <tr>' +
            '                        <td bgcolor="#ffffff" align="left">' +
            '                            <table width="100%" border="0" cellspacing="0" cellpadding="0">' +
            '                                <tr>' +
            '                                    <td bgcolor="#ffffff" align="center" style="padding: 20px 30px 60px 30px;">' +
            '                                        <table border="0" cellspacing="0" cellpadding="0">' +
            '                                            <tr>' +
            '                                            </tr>' +
            '                                        </table>' +
            '                                    </td>' +
            '                                </tr>' +
            '                            </table>' +
            '                        </td>' +
            '                    </tr> <!-- COPY -->' +
            '                    <tr>' +
            '                        <td bgcolor="#ffffff" align="left" style="padding: 0px 30px 0px 30px; color: #666666; font-family: \'Lato\', Helvetica, Arial, sans-serif; font-size: 18px; font-weight: 400; line-height: 25px;">' +

            '                        </td>' +
            '                    </tr> <!-- COPY -->' +
            '                    <tr>' +
            '                        <td bgcolor="#ffffff" align="left" style="padding: 20px 30px 20px 30px; color: #666666; font-family: \'Lato\', Helvetica, Arial, sans-serif; font-size: 18px; font-weight: 400; line-height: 25px;">' +
            '                        </td>' +
            '                    </tr>' +
            '                    <tr>' +
            '                        <td bgcolor="#ffffff" align="left" style="padding: 0px 30px 20px 30px; color: #666666; font-family: \'Lato\', Helvetica, Arial, sans-serif; font-size: 18px; font-weight: 400; line-height: 25px;">' +
            '                            <p style="margin: 0; text-align: right; text-align: right;"></p>' +
            '                        </td>' +
            '                    </tr>' +
            '                    <tr>' +
            '                    </tr>' +
            '                </table>' +
            '            </td>' +
            '        </tr>' +
            '        <tr>' +
            '            <td bgcolor="#f4f4f4" align="center" style="padding: 30px 10px 0px 10px;">' +
            '                <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px;">' +
            '                    <tr>' +
            '                       ' +
            '                    </tr>' +
            '                </table>' +
            '            </td>' +
            '        </tr>' +
            '        <tr>' +
            '            <td bgcolor="#f4f4f4" align="center" style="padding: 0px 10px 0px 10px;">' +
            '                <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px;">' +
            '                    <tr>' +
            '                        ' +
            '                    </tr>' +
            '                </table>' +
            '            </td>' +
            '        </tr>' +
            '    </table>' +
            '</body>' +
            '' +
            '</html>';
        return html;
    },
    getPasswordReplacedEmail(email) {
        const html='<!DOCTYPE html>' +
            '<html>' +
            '' +
            '<head>' +
            '    <title></title>' +
            '    <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />' +
            '    <meta name="viewport" content="width=device-width, initial-scale=1">' +
            '    <meta http-equiv="X-UA-Compatible" content="IE=edge" />' +
            '    <style type="text/css">' +
            '        @media screen {' +
            '            @font-face {' +
            '                font-family: \'Lato\';' +
            '                font-style: normal;' +
            '                font-weight: 400;' +
            '                src: local(\'Lato Regular\'), local(\'Lato-Regular\'), url(https://fonts.gstatic.com/s/lato/v11/qIIYRU-oROkIk8vfvxw6QvesZW2xOQ-xsNqO47m55DA.woff) format(\'woff\');' +
            '            }' +
            '' +
            '            @font-face {' +
            '                font-family: \'Lato\';' +
            '                font-style: normal;' +
            '                font-weight: 700;' +
            '                src: local(\'Lato Bold\'), local(\'Lato-Bold\'), url(https://fonts.gstatic.com/s/lato/v11/qdgUG4U09HnJwhYI-uK18wLUuEpTyoUstqEm5AMlJo4.woff) format(\'woff\');' +
            '            }' +
            '' +
            '            @font-face {' +
            '                font-family: \'Lato\';' +
            '                font-style: italic;' +
            '                font-weight: 400;' +
            '                src: local(\'Lato Italic\'), local(\'Lato-Italic\'), url(https://fonts.gstatic.com/s/lato/v11/RYyZNoeFgb0l7W3Vu1aSWOvvDin1pK8aKteLpeZ5c0A.woff) format(\'woff\');' +
            '            }' +
            '' +
            '            @font-face {' +
            '                font-family: \'Lato\';' +
            '                font-style: italic;' +
            '                font-weight: 700;' +
            '                src: local(\'Lato Bold Italic\'), local(\'Lato-BoldItalic\'), url(https://fonts.gstatic.com/s/lato/v11/HkF_qI1x_noxlxhrhMQYELO3LdcAZYWl9Si6vvxL-qU.woff) format(\'woff\');' +
            '            }' +
            '        }' +
            '' +
            '        /* CLIENT-SPECIFIC STYLES */' +
            '        body,' +
            '        table,' +
            '        td,' +
            '        a {' +
            '            -webkit-text-size-adjust: 100%;' +
            '            -ms-text-size-adjust: 100%;' +
            '        }' +
            '' +
            '        table,' +
            '        td {' +
            '            mso-table-lspace: 0pt;' +
            '            mso-table-rspace: 0pt;' +
            '        }' +
            '' +
            '        img {' +
            '            -ms-interpolation-mode: bicubic;' +
            '        }' +
            '' +
            '        /* RESET STYLES */' +
            '        img {' +
            '            border: 0;' +
            '            height: auto;' +
            '            line-height: 100%;' +
            '            outline: none;' +
            '            text-decoration: none;' +
            '        }' +
            '' +
            '        table {' +
            '            border-collapse: collapse !important;' +
            '        }' +
            '' +
            '        body {' +
            '            height: 100% !important;' +
            '            margin: 0 !important;' +
            '            padding: 0 !important;' +
            '            width: 100% !important;' +
            '        }' +
            '' +
            '        /* iOS BLUE LINKS */' +
            '        a[x-apple-data-detectors] {' +
            '            color: inherit !important;' +
            '            text-decoration: none !important;' +
            '            font-size: inherit !important;' +
            '            font-family: inherit !important;' +
            '            font-weight: inherit !important;' +
            '            line-height: inherit !important;' +
            '        }' +
            '' +
            '        /* MOBILE STYLES */' +
            '        @media screen and (max-width:600px) {' +
            '            h1 {' +
            '                font-size: 32px !important;' +
            '                line-height: 32px !important;' +
            '            }' +
            '        }' +
            '' +
            '        /* ANDROID CENTER FIX */' +
            '        div[style*="margin: 16px 0;"] {' +
            '            margin: 0 !important;' +
            '        }' +
            '    </style>' +
            '</head>' +
            '' +
            '<body style="background-color: #f4f4f4; margin: 0 !important; padding: 0 !important;">' +
            '    <!-- HIDDEN PREHEADER TEXT -->' +
            '    <div style="display: none; font-size: 1px; color: #fefefe; line-height: 1px; font-family: \'Lato\', Helvetica, Arial, sans-serif; max-height: 0px; max-width: 0px; opacity: 0; overflow: hidden;">בקשתך לאיפוס סיסמא</div>' +
            '    <table border="0" cellpadding="0" cellspacing="0" width="100%">' +
            '        <!-- LOGO -->' +
            '        <tr>' +
            '            <td bgcolor="#1d2b36" align="center">' +
            '                <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px;">' +
            '                    <tr>' +
            '                        <td align="center" valign="top" style="padding: 40px 10px 40px 10px;"> </td>' +
            '                    </tr>' +
            '                </table>' +
            '            </td>' +
            '        </tr>' +
            '        <tr>' +
            '            <td bgcolor="#1d2b36" align="center" style="padding: 0px 10px 0px 10px;">' +
            '                <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px;">' +
            '                    <tr>' +
            '                        <td bgcolor="#ffffff" align="center" valign="top" style="padding: 40px 20px 20px 20px; border-radius: 4px 4px 0px 0px; color: #111111; font-family: \'Lato\', Helvetica, Arial, sans-serif; font-size: 48px; font-weight: 400; letter-spacing: 4px; line-height: 48px;">' +
            '                            <h1 style="font-size: 48px; font-weight: 400; margin: 2;"></h1> <img src="https://firebasestorage.googleapis.com/v0/b/notes-207711.appspot.com/o/images%2Fmeshi-full-icon-small.jpg?alt=media&token=150fc589-a7f6-49e3-b355-d8d2cbec1d2e" width="125" height="120" style="display: block; border: 0px;" />' +
            '                        </td>' +
            '                    </tr>' +
            '                </table>' +
            '            </td>' +
            '        </tr>' +
            '        <tr>' +
            '            <td bgcolor="#f4f4f4" align="center" style="padding: 0px 10px 0px 10px;">' +
            '                <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px;">' +
            '                    <tr>' +
            '                        <td bgcolor="#ffffff" align="left" style="padding: 20px 30px 40px 30px; color: #666666; font-family: \'Lato\', Helvetica, Arial, sans-serif; font-size: 18px; font-weight: 400; line-height: 25px;">' +
            '                            <p style="margin: 0;  text-align: right;">סיסמא הוחלפה בהצלחה ' +email+
            '</p>' +
            '                        </td>' +
            '                    </tr>' +
            '                    <tr>' +
            '                        <td bgcolor="#ffffff" align="left">' +
            '                            <table width="100%" border="0" cellspacing="0" cellpadding="0">' +
            '                                <tr>' +
            '                                    <td bgcolor="#ffffff" align="center" style="padding: 20px 30px 60px 30px;">' +
            '                                        <table border="0" cellspacing="0" cellpadding="0">' +
            '                                            <tr>' +
            // '                                                <td align="center" style="border-radius: 3px;" bgcolor="#b8e2ae"><a href=\"\"'+'target="_blank" style="font-size: 20px; font-family: Helvetica, Arial, sans-serif; color: #ffffff; text-decoration: none; color: #ffffff; text-decoration: none; padding: 15px 25px; border-radius: 2px; border: 1px solid #b8e2ae; display: inline-block;">איפוס סיסמה</a></td>' +
            '                                            </tr>' +
            '                                        </table>' +
            '                                    </td>' +
            '                                </tr>' +
            '                            </table>' +
            '                        </td>' +
            '                    </tr> <!-- COPY -->' +
            '                    <tr>' +
            '                        <td bgcolor="#ffffff" align="left" style="padding: 0px 30px 0px 30px; color: #666666; font-family: \'Lato\', Helvetica, Arial, sans-serif; font-size: 18px; font-weight: 400; line-height: 25px;">' +
            '                            <p style="margin: 0;  text-align: right;">במידה ולא ביקשת לאפס סיסמא אנא פנה לתמיכה</p>' +
            '                        </td>' +
            '                    </tr> <!-- COPY -->' +
            '                    <tr>' +
            '                        <td bgcolor="#ffffff" align="left" style="padding: 20px 30px 20px 30px; color: #666666; font-family: \'Lato\', Helvetica, Arial, sans-serif; font-size: 18px; font-weight: 400; line-height: 25px;">' +
            " <p style=\"margin: 0;  text-align: right;\"><a href=\"\" target=\"_blank\" style=\"color: #b8e2ae;\"></a></p>" +
            '                        </td>' +
            '                    </tr>' +
            '                    <tr>' +
            '                        <td bgcolor="#ffffff" align="left" style="padding: 0px 30px 20px 30px; color: #666666; font-family: \'Lato\', Helvetica, Arial, sans-serif; font-size: 18px; font-weight: 400; line-height: 25px;">' +
            '                            <p style="margin: 0;  text-align: right;"></p>' +
            '                        </td>' +
            '                    </tr>' +
            '                    <tr>' +
            '                    </tr>' +
            '                </table>' +
            '            </td>' +
            '        </tr>' +
            '        <tr>' +
            '            <td bgcolor="#f4f4f4" align="center" style="padding: 30px 10px 0px 10px;">' +
            '                <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px;">' +
            '                    <tr>' +
            '                       ' +
            '                    </tr>' +
            '                </table>' +
            '            </td>' +
            '        </tr>' +
            '        <tr>' +
            '            <td bgcolor="#f4f4f4" align="center" style="padding: 0px 10px 0px 10px;">' +
            '                <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px;">' +
            '                    <tr>' +
            '                        ' +
            '                    </tr>' +
            '                </table>' +
            '            </td>' +
            '        </tr>' +
            '    </table>' +
            '</body>' +
            '' +
            '</html>';
        return html;
    }
}