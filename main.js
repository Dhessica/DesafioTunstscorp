const {google} = require('googleapis');
const keys = require('./keys.json');

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
    let res = await gsapi.spreadsheets.values.update(updateOpt);

}
