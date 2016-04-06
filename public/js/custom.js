$(window).load(function() {
    $('#tabs').jKit('tabs', { 'animation': 'slide' });

    $('.fecha').change(function() {

        var fechaDesde = $('#fecha-desde').val();
        var fechaHasta = $('#fecha-hasta').val();
        if (fechaDesde && fechaHasta) {

            var f1 = moment(fechaDesde);
            console.log(f1.format('YYYY-MM-DD'));
            var f2 = moment(fechaHasta);
            console.log(f2.format('YYYY-MM-DD'));


            var diffDays = f2.diff(f1, 'days');
            console.log('diffdays son: '+diffDays);

            grafica1();
            grafica2();

            function grafica1() {
                var te = myBarChart1.datasets[0].bars.length;
                for (var j = 0; j < te ; j++) {
                    myBarChart1.removeData()
                }
                var x = 0;
                var f = moment(f1.format('YYYY-MM-DD'));
                for (var i = 0; i <= diffDays ; i++) {
                    var despues = moment(f.format('YYYY-MM-DD'));
                    despues.add(1, 'd');
                    myBarChart1.addData([0], f.format('DD/MM'));
                    $.get('/api', { fecha1: f.format(), fecha2: despues.format() })
                        .done(function(data) {
                            myBarChart1.datasets[0].bars[x].value = data.length;
                            myBarChart1.update();
                            x++;
                        })
                        .fail(function() {
                            alert('Se ha producido un fallo, intentelo de nuevo o verifique su conexion a internet');
                        });
                    f.add(1, 'd');
            }}

            function grafica2() {
                var te = myBarChart2.datasets[0].bars.length;
                for (var j = 0; j < te ; j++) {
                    myBarChart2.removeData()
                }
                var x = 0;
                var y = 0;
                var f = moment(f1.format('YYYY-MM-DD'));
                for (var i = 0; i <= diffDays ; i++) {
                    var despues = moment(f.format('YYYY-MM-DD'));
                    despues.add(1, 'd');
                    myBarChart2.addData([0,0], f.format('DD/MM'));
                    $.get('/api', { fecha1: f.format(), fecha2: despues.format() })
                        .done(function(data) {
                            myBarChart2.datasets[0].bars[x].value = data.length;
                            myBarChart2.update();
                            x++;
                        })
                        .fail(function() {
                            alert('Se ha producido un fallo, intentelo de nuevo o verifique su conexion a internet');
                        });
                    $.get('/api', { fecha1: f.format(), fecha2: despues.format() })
                        .done(function(data) {
                            myBarChart2.datasets[1].bars[x].value = data.length;
                            myBarChart2.update();
                            y++;
                        })
                        .fail(function() {
                            alert('Se ha producido un fallo, intentelo de nuevo o verifique su conexion a internet');
                        });
                    f.add(1, 'd');
            }}







        } else {
            console.log('No has selecioando 2 fechas')
        }
    });



    var dataChart = {
        labels: [],
        datasets: [
            {
            label: "Clientes",
            fillColor: "rgba(220,220,220,0.5)",
            strokeColor: "rgba(220,220,220,0.8)",
            highlightFill: "rgba(220,220,220,0.75)",
            highlightStroke: "rgba(220,220,220,1)",
            data: []
            }
        ]
    }



    var data2 = {
        labels: [],
        datasets: [
            {
            label: "PRO",
            fillColor: "rgba(220,220,220,0.5)",
            strokeColor: "rgba(220,220,220,0.8)",
            highlightFill: "rgba(220,220,220,0.75)",
            highlightStroke: "rgba(220,220,220,1)",
            data: []
            },
            {
            label: "Particuler",
            fillColor: "rgba(151,187,205,0.5)",
            strokeColor: "rgba(151,187,205,0.8)",
            highlightFill: "rgba(151,187,205,0.75)",
            highlightStroke: "rgba(151,187,205,1)",
            data: []
            }
        ]
    }



    var ctx1 = $("#myChart1").get(0).getContext("2d");
    var myBarChart1 = new Chart(ctx1).Bar(dataChart);





    var ctx2 = $("#myChart2").get(0).getContext("2d");
    var myBarChart2 = new Chart(ctx2).Bar(data2);



    var data2 = [
    {
        value: 76,
        color: "#46BFBD",
        highlight: "#5AD3D1",
        label: "PRO"
    },
    {
        value: 98,
        color: "#FDB45C",
        highlight: "#FFC870",
        label: "Particuler"
    }];

    var ctx3 = $("#myChart3").get(0).getContext("2d");
    var myPieChart1 = new Chart(ctx3).Pie(data2);

    var data3 = [ {
        value: 76,
        color: "#46BFBD",
        highlight: "#5AD3D1",
        label: "PRO"
    },{
        value: 15,
        color: "#FDB45C",
        highlight: "#FFC870",
        label: "Particuler"
    },{
        value: 34,
        color: "#FDB45C",
        highlight: "#FFC870",
        label: "Particuler"
    },{
        value: 97,
        color: "#FDB45C",
        highlight: "#FFC870",
        label: "Particuler"
    }];

    var ctx4 = $("#myChart4").get(0).getContext("2d");
    var myPieChart2 = new Chart(ctx4).Pie(data3);

    var ctx5 = $("#myChart5").get(0).getContext("2d");
    var myPieChart3 = new Chart(ctx5).Pie(data3);


    Chart.defaults.global = {
        responsive: true
    }

});
