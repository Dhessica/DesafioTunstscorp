const {google} = require('googleapis');
const keys = {
    "type": "service_account",
    "project_id": "primeiroproj-253919",
    "private_key_id": "0476e86079c3060122103c48071f6af2c8d3ce2c",
    "private_key": "-----BEGIN PRIVATE KEY-----\nMIIEvAIBADANBgkqhkiG9w0BAQEFAASCBKYwggSiAgEAAoIBAQDY/3n4Yj4S5w3n\nq+P6yBtDM4gbjqXOA6abcq5WXg6GvA9DHkIfcvhLPwmyOD2fYXkpRP/LpKzY/vG9\nU/vv1fzhNNeG3it8hO4E5yGeEp5YP/DSVlCDgNOvMfs+ytAoU+oJE0VXKl7s8TKG\nm1mbcYcpz4x9RjAi4Zd+LVbWM6jrTGhI2UDkrASocnuRZ+/X5cl27VVflPxbrUBI\nDPuqrFZ1MXewkJQla5V8DIvWTwQCXlOqZxUDmXaknxvjZ9H+beMCTlHzjlVAmv2c\nxLrEzFbvEoebxLdAqtR9t+oA5wQuAlWFAjbP+W9L9YtnorpPAxJGqv2MasAOm9sC\nU1H2LydRAgMBAAECggEASZyg67moBRGMjgKpm/E2Dl301iRV6sUiR6lnqrTNiLdT\nFhm1pKWDxULlLygU/3Q5fd6CR7rdR990ch2DYaDd4Cfk1UOYzOzrMY6WwODgBl/q\nee/98B5LsSrraCm043lT8zAuXZtqCEbqNO+OPkUM7QoTRowA2FRe59bJlnB/5RGu\nKAHje9gAH+VTpsaiXl5dLSwU+Tlu7SFKlLE1faq6ApIALTaAmUhfAIyepVurXKkB\n9m7EMVv6si2xdjbasHid3i05KBESuHk7RBYm2mKOOQnLKn7e1lZGeJto3sJr7agb\nChiOBEJwBN5pZ/fNhkcUOEf+jA1SnluWe19jfIWD4QKBgQD8MVzmRLlg0zGssfTN\naOQvKDk7G7ghZ7UIfpxU7NYJK/18uk91qs9IFhhjPPWQzjxlMb406wLnRQaTpRs+\nhC6sv8AY2jV5sS/sDArbjoud+Dv4Q9h5BjlJbHfdEKJ/4sx4427h3/ZUwJczTXtH\nREP16sFDZ+WOumlespY8Z3/NQwKBgQDcRhkCTu9HKXrNcZ309guCxrh/52SjPL3R\nR/fzHxzef1K3conrK77AceM3xqVBjCYAKipdeB0xKAsWPx/jQsDARNKs7KS7ZImE\nYIgAXmaTnUw9ffHY1kA0NisfVmPmCBnZeUclzx7ISiqAMVqyWaPQjVUm45+lcvxb\nEX2I8CLF2wKBgHm3IU0JcibnBxyALtRMgYS49xYuBKoqsVbONIlQXOTEVG00RlFW\nBQCXmWGb9DDVOJTmcxR7MEWKLOhpUULU7On3CbF070YyXByim0LoAz5UpizmIb4X\nYOKs9RS+iI8MWP8nVUaynuK8qLzb8lms+tffWzM7G7HNCjnoG1Y/5ZCdAoGAHg36\nb5QxlbYVKV7tPHUt0OQoXFtIIfWxuJJnRGbkW39n29vm8Y2Ac2WWqQ+TkMP8k10t\ndp9i7EgYayqlwS5keldpn2qSd3caRFOfet1mhZGay3EZxIpHLFiPvbDd5I8KZ9/i\nU0hVXOKxtdgGFfuhHF2MVsgMClkMEajrRfnt5K0CgYAaJpWXFP0aqf3QHGZXf4wM\ncdIdbmuN+muSuHKS5EnwBv6o0Y29lwWE1oZE2/aD0yjs13/VdgqtfBkvbb6wo+3D\njfzUVO7oSxKbvDRw5isk+DjZsOQwbRI9me6XPJ3g0mGT1aJFuLriwj/s+cwi8bdi\nhWPjDVpSsoGXRidKK1+vBQ==\n-----END PRIVATE KEY-----\n",
    "client_email": "dhessicamoura@primeiroproj-253919.iam.gserviceaccount.com",
    "client_id": "113734665155186747783",
    "auth_uri": "https://accounts.google.com/o/oauth2/auth",
    "token_uri": "https://oauth2.googleapis.com/token",
    "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
    "client_x509_cert_url": "https://www.googleapis.com/robot/v1/metadata/x509/dhessicamoura%40primeiroproj-253919.iam.gserviceaccount.com"
  };

const client = new google.auth.JWT(
    keys.client_email,
    null,
    keys.private_key,
    ['https://www.googleapis.com/auth/spreadsheets']
);

client.authorize(function(err, tokens){
    if(err){
        console.log(err);
        return;
    } else {
        console.log('Connected!');
        gsrun(client);
    }
});

async function gsrun(client){
    const gsapi = google.sheets({version: 'v4', auth: client});
    const opt= {
        spreadsheetId: '1Bu1Ei_PVaZpTKTJb3bIMl7ZKumvBGV1yJ52slU8BlSc',
        range: "A4:I27"
    };
   
    let data = await gsapi.spreadsheets.values.get(opt);
    let dataArray = data.data.values;

    console.log(dataArray);

    var aux;
    med =[];
    situ = [];
    naf = [];
    for(aux=0; aux<24; aux++){
        faltas = dataArray[aux][2];
        limiteFaltas = 60*0.25;
        p1 = parseInt(dataArray[aux][3],10);
        p2 = parseInt(dataArray[aux][4],10);
        p3 = parseInt(dataArray[aux][5],10);
        m = (p1+p2+p3)/3;
        med.push(m);

        if (faltas > limiteFaltas){
            sit = "Reprovado por Falta";
            nf = parseInt(0,10);
            situ.push(sit);
            naf.push(nf);
        } else if (m < 50){
            sit = "Reprovado por Nota";
            nf = parseInt(0,10);;   
            situ.push(sit);
            naf.push(nf);         
        } else if (m >= 70){
            sit = "Aprovado";
            nf = parseInt(0,10);;
            situ.push(sit);
            naf.push(nf);
        } else {
            sit = "Exame Final";
            nf = parseInt(100-m);
            situ.push(sit);
            naf.push(nf);
        };
    };
    
    console.log(med);
    console.log(situ);
    console.log(naf);

    newDataArray=[];
    for(aux=0; aux<24; aux++){
        newd = dataArray[aux].concat(situ[aux], naf[aux]);
        newDataArray.push(newd)
    };
    console.log(newDataArray);

    const updateOpt= {
        spreadsheetId: '1Bu1Ei_PVaZpTKTJb3bIMl7ZKumvBGV1yJ52slU8BlSc',
        range: "A4",
        valueInputOption: 'USER_ENTERED',
        resource: {values: newDataArray}
    };
    await gsapi.spreadsheets.values.update(updateOpt);
}
