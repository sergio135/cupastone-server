$(window).load(function() {
    $('#tabs').jKit('tabs', { 'animation': 'slide' });

    $('.fecha').change(function() {
        general();
    })

    $('.boton-agencias').click(function() {
        var agencia = $(this).attr('id');
        generalEspecifica(agencia);
    });

    function generalEspecifica(param) {
        var fechaDesde = $('#fecha-desde').val();
        var fechaHasta = $('#fecha-hasta').val();
        if (fechaDesde && fechaHasta && param) {

            var f1 = moment(fechaDesde);
            //console.log(f1.format('YYYY-MM-DD'));
            var f2 = moment(fechaHasta);
            //console.log(f2.format('YYYY-MM-DD'));

            var diffDays = f2.diff(f1, 'days');
            //console.log('diffdays son: '+diffDays);

            grafica1();
            grafica2();
            grafica3();
            grafica4();
            grafica5();

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
                    $.get('/api', { fecha:{$gte:f.format(), $lte:despues.format()}, agencia: param })
                        .done(function(data) {
                            myBarChart1.datasets[0].bars[x].value = data.length;
                            myBarChart1.update();
                            x++;
                        })
                        .fail(function() {
                            alert('Se ha producido un fallo, intentelo de nuevo o verifique su conexion a internet');
                        });
                    f.add(1, 'd');
            }   };

            function grafica2() {
                var borrar = myBarChart2.datasets[0].bars.length;
                for (var j = 0; j < borrar ; j++) {
                    myBarChart2.removeData()
                }
                var x = 0;
                var y = 0;
                var f = moment(f1.format('YYYY-MM-DD'));
                for (var i = 0; i <= diffDays ; i++) {
                    var despues = moment(f.format('YYYY-MM-DD'));
                    despues.add(1, 'd');
                    myBarChart2.addData([0,0], f.format('DD/MM'));
                    $.get('/api', { fecha:{$gte:f.format(), $lte:despues.format()}, opcion1:'pro', agencia: param })
                        .done(function(data) {
                            myBarChart2.datasets[0].bars[x].value = data.length;
                            myBarChart2.update();
                            x++;
                        })
                        .fail(function() {
                            alert('Se ha producido un fallo, intentelo de nuevo o verifique su conexion a internet');
                        });
                    $.get('/api', { fecha:{$gte:f.format(), $lte:despues.format()}, opcion1:'partculier', agencia: param })
                        .done(function(data) {
                            myBarChart2.datasets[1].bars[y].value = data.length;
                            myBarChart2.update();
                            y++;
                        })
                        .fail(function() {
                            alert('Se ha producido un fallo, intentelo de nuevo o verifique su conexion a internet');
                        });
                    f.add(1, 'd');
            }   };

            function grafica3() {
                var f = moment(f1.format('YYYY-MM-DD'));
                var fa = moment(f2.format('YYYY-MM-DD'));
                $.get('/api', { fecha:{$gte:f.format(), $lte:fa.format()}, opcion2:'nouveau', agencia: param })
                    .done(function(data) {
                        myPieChart1.segments[0].value = data.length;
                        myPieChart1.update();
                    })
                    .fail(function() {
                        alert('Se ha producido un fallo, intentelo de nuevo o verifique su conexion a internet');
                    });
                $.get('/api', { fecha:{$gte:f.format(), $lte:fa.format()}, opcion2:'cliente habituel', agencia: param })
                    .done(function(data) {
                        myPieChart1.segments[1].value = data.length;
                        myPieChart1.update();
                    })
                    .fail(function() {
                        alert('Se ha producido un fallo, intentelo de nuevo o verifique su conexion a internet');
                    });
            };

            function grafica4() {
                var f = moment(f1.format('YYYY-MM-DD'));
                var fa = moment(f2.format('YYYY-MM-DD'));
                $.get('/api', { fecha:{$gte:f.format(), $lte:fa.format()}, opcion2:'nouveau', lista:'Bouche á oreille', agencia: param })
                    .done(function(data) {
                        myPieChart2.segments[0].value = data.length;
                        myPieChart2.update();
                    })
                    .fail(function() {
                        alert('Se ha producido un fallo, intentelo de nuevo o verifique su conexion a internet');
                    });
                $.get('/api', { fecha:{$gte:f.format(), $lte:fa.format()}, opcion2:'nouveau', lista:'Salon', agencia: param })
                    .done(function(data) {
                        myPieChart2.segments[1].value = data.length;
                        myPieChart2.update();
                    })
                    .fail(function() {
                        alert('Se ha producido un fallo, intentelo de nuevo o verifique su conexion a internet');
                    });
                $.get('/api', { fecha:{$gte:f.format(), $lte:fa.format()}, opcion2:'nouveau', lista:'Pub Journal/magazine', agencia: param })
                    .done(function(data) {
                        myPieChart2.segments[2].value = data.length;
                        myPieChart2.update();
                    })
                    .fail(function() {
                        alert('Se ha producido un fallo, intentelo de nuevo o verifique su conexion a internet');
                    });
                $.get('/api', { fecha:{$gte:f.format(), $lte:fa.format()}, opcion2:'nouveau', lista:'Pub radio', agencia: param })
                    .done(function(data) {
                        myPieChart2.segments[3].value = data.length;
                        myPieChart2.update();
                    })
                    .fail(function() {
                        alert('Se ha producido un fallo, intentelo de nuevo o verifique su conexion a internet');
                    });
                $.get('/api', { fecha:{$gte:f.format(), $lte:fa.format()}, opcion2:'nouveau', lista:'Affichage dans la rue', agencia: param })
                    .done(function(data) {
                        myPieChart2.segments[4].value = data.length;
                        myPieChart2.update();
                    })
                    .fail(function() {
                        alert('Se ha producido un fallo, intentelo de nuevo o verifique su conexion a internet');
                    });
                $.get('/api', { fecha:{$gte:f.format(), $lte:fa.format()}, opcion2:'nouveau', lista:'Pub TV', agencia: param })
                    .done(function(data) {
                        myPieChart2.segments[5].value = data.length;
                        myPieChart2.update();
                    })
                    .fail(function() {
                        alert('Se ha producido un fallo, intentelo de nuevo o verifique su conexion a internet');
                    });
                $.get('/api', { fecha:{$gte:f.format(), $lte:fa.format()}, opcion2:'nouveau', lista:'Internet/Web', agencia: param })
                    .done(function(data) {
                        myPieChart2.segments[6].value = data.length;
                        myPieChart2.update();
                    })
                    .fail(function() {
                        alert('Se ha producido un fallo, intentelo de nuevo o verifique su conexion a internet');
                    });
                $.get('/api', { fecha:{$gte:f.format(), $lte:fa.format()}, opcion2:'nouveau', lista:'Promo courrier', agencia: param })
                    .done(function(data) {
                        myPieChart2.segments[7].value = data.length;
                        myPieChart2.update();
                    })
                    .fail(function() {
                        alert('Se ha producido un fallo, intentelo de nuevo o verifique su conexion a internet');
                    });
                $.get('/api', { fecha:{$gte:f.format(), $lte:fa.format()}, opcion2:'nouveau', lista:'Promo email', agencia: param })
                    .done(function(data) {
                        myPieChart2.segments[8].value = data.length;
                        myPieChart2.update();
                    })
                    .fail(function() {
                        alert('Se ha producido un fallo, intentelo de nuevo o verifique su conexion a internet');
                    });
                $.get('/api', { fecha:{$gte:f.format(), $lte:fa.format()}, opcion2:'nouveau', lista:'Presse', agencia: param })
                    .done(function(data) {
                        myPieChart2.segments[9].value = data.length;
                        myPieChart2.update();
                    })
                    .fail(function() {
                        alert('Se ha producido un fallo, intentelo de nuevo o verifique su conexion a internet');
                    });
                $.get('/api', { fecha:{$gte:f.format(), $lte:fa.format()}, opcion2:'nouveau', lista:'Visite spontanée', agencia: param })
                    .done(function(data) {
                        myPieChart2.segments[10].value = data.length;
                        myPieChart2.update();
                    })
                    .fail(function() {
                        alert('Se ha producido un fallo, intentelo de nuevo o verifique su conexion a internet');
                    });
                $.get('/api', { fecha:{$gte:f.format(), $lte:fa.format()}, opcion2:'nouveau', lista:'Recommandation PRO', agencia: param })
                    .done(function(data) {
                        myPieChart2.segments[11].value = data.length;
                        myPieChart2.update();
                    })
                    .fail(function() {
                        alert('Se ha producido un fallo, intentelo de nuevo o verifique su conexion a internet');
                    });
            };

            function grafica5() {
                var f = moment(f1.format('YYYY-MM-DD'));
                var fa = moment(f2.format('YYYY-MM-DD'));
                $.get('/api', { fecha:{$gte:f.format(), $lte:fa.format()}, opcion2:'cliente habituel', lista:'Récupération commande', agencia: param })
                    .done(function(data) {
                        myPieChart3.segments[0].value = data.length;
                        myPieChart3.update();
                    })
                    .fail(function() {
                        alert('Se ha producido un fallo, intentelo de nuevo o verifique su conexion a internet');
                    });
                $.get('/api', { fecha:{$gte:f.format(), $lte:fa.format()}, opcion2:'cliente habituel', lista:'Prise commande', agencia: param })
                    .done(function(data) {
                        myPieChart3.segments[1].value = data.length;
                        myPieChart3.update();
                    })
                    .fail(function() {
                        alert('Se ha producido un fallo, intentelo de nuevo o verifique su conexion a internet');
                    });
                $.get('/api', { fecha:{$gte:f.format(), $lte:fa.format()}, opcion2:'cliente habituel', lista:'Demande de prix et infos', agencia: param })
                    .done(function(data) {
                        myPieChart3.segments[2].value = data.length;
                        myPieChart3.update();
                    })
                    .fail(function() {
                        alert('Se ha producido un fallo, intentelo de nuevo o verifique su conexion a internet');
                    });
                $.get('/api', { fecha:{$gte:f.format(), $lte:fa.format()}, opcion2:'cliente habituel', lista:'Visite avec clients particuliers', agencia: param })
                    .done(function(data) {
                        myPieChart3.segments[3].value = data.length;
                        myPieChart3.update();
                    })
                    .fail(function() {
                        alert('Se ha producido un fallo, intentelo de nuevo o verifique su conexion a internet');
                    });
                $.get('/api', { fecha:{$gte:f.format(), $lte:fa.format()}, opcion2:'cliente habituel', lista:'Visite agence/équipe', agencia: param })
                    .done(function(data) {
                        myPieChart3.segments[4].value = data.length;
                        myPieChart3.update();
                    })
                    .fail(function() {
                        alert('Se ha producido un fallo, intentelo de nuevo o verifique su conexion a internet');
                    });
                $.get('/api', { fecha:{$gte:f.format(), $lte:fa.format()}, opcion2:'cliente habituel', lista:'Promo courrier', agencia: param })
                    .done(function(data) {
                        myPieChart3.segments[5].value = data.length;
                        myPieChart3.update();
                    })
                    .fail(function() {
                        alert('Se ha producido un fallo, intentelo de nuevo o verifique su conexion a internet');
                    });
                $.get('/api', { fecha:{$gte:f.format(), $lte:fa.format()}, opcion2:'cliente habituel', lista:'Promo email', agencia: param })
                    .done(function(data) {
                        myPieChart3.segments[6].value = data.length;
                        myPieChart3.update();
                    })
                    .fail(function() {
                        alert('Se ha producido un fallo, intentelo de nuevo o verifique su conexion a internet');
                    });
            };

        } else {
            alert('Tienes que selecionar 2 fechas')
        }
    };

    function general() {

        var fechaDesde = $('#fecha-desde').val();
        var fechaHasta = $('#fecha-hasta').val();
        if (fechaDesde && fechaHasta) {

            var f1 = moment(fechaDesde);
            //console.log(f1.format('YYYY-MM-DD'));
            var f2 = moment(fechaHasta);
            //console.log(f2.format('YYYY-MM-DD'));

            var diffDays = f2.diff(f1, 'days');
            //console.log('diffdays son: '+diffDays);

            grafica1();
            grafica2();
            grafica3();
            grafica4();
            grafica5();

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
                    $.get('/api', { fecha:{$gte:f.format(), $lte:despues.format()} })
                        .done(function(data) {
                            myBarChart1.datasets[0].bars[x].value = data.length;
                            myBarChart1.update();
                            x++;
                        })
                        .fail(function() {
                            alert('Se ha producido un fallo, intentelo de nuevo o verifique su conexion a internet');
                        });
                    f.add(1, 'd');
            }   };

            function grafica2() {
                var borrar = myBarChart2.datasets[0].bars.length;
                for (var j = 0; j < borrar ; j++) {
                    myBarChart2.removeData()
                }
                var x = 0;
                var y = 0;
                var f = moment(f1.format('YYYY-MM-DD'));
                for (var i = 0; i <= diffDays ; i++) {
                    var despues = moment(f.format('YYYY-MM-DD'));
                    despues.add(1, 'd');
                    myBarChart2.addData([0,0], f.format('DD/MM'));
                    $.get('/api', { fecha:{$gte:f.format(), $lte:despues.format()}, opcion1:'pro' })
                        .done(function(data) {
                            myBarChart2.datasets[0].bars[x].value = data.length;
                            myBarChart2.update();
                            x++;
                        })
                        .fail(function() {
                            alert('Se ha producido un fallo, intentelo de nuevo o verifique su conexion a internet');
                        });
                    $.get('/api', { fecha:{$gte:f.format(), $lte:despues.format()}, opcion1:'partculier' })
                        .done(function(data) {
                            myBarChart2.datasets[1].bars[y].value = data.length;
                            myBarChart2.update();
                            y++;
                        })
                        .fail(function() {
                            alert('Se ha producido un fallo, intentelo de nuevo o verifique su conexion a internet');
                        });
                    f.add(1, 'd');
            }   };

            function grafica3() {
                var f = moment(f1.format('YYYY-MM-DD'));
                var fa = moment(f2.format('YYYY-MM-DD'));
                $.get('/api', { fecha:{$gte:f.format(), $lte:fa.format()}, opcion2:'nouveau' })
                    .done(function(data) {
                        myPieChart1.segments[0].value = data.length;
                        myPieChart1.update();
                    })
                    .fail(function() {
                        alert('Se ha producido un fallo, intentelo de nuevo o verifique su conexion a internet');
                    });
                $.get('/api', { fecha:{$gte:f.format(), $lte:fa.format()}, opcion2:'cliente habituel' })
                    .done(function(data) {
                        myPieChart1.segments[1].value = data.length;
                        myPieChart1.update();
                    })
                    .fail(function() {
                        alert('Se ha producido un fallo, intentelo de nuevo o verifique su conexion a internet');
                    });
            };

            function grafica4() {
                var f = moment(f1.format('YYYY-MM-DD'));
                var fa = moment(f2.format('YYYY-MM-DD'));
                $.get('/api', { fecha:{$gte:f.format(), $lte:fa.format()}, opcion2:'nouveau', lista:'Bouche á oreille' })
                    .done(function(data) {
                        myPieChart2.segments[0].value = data.length;
                        myPieChart2.update();
                    })
                    .fail(function() {
                        alert('Se ha producido un fallo, intentelo de nuevo o verifique su conexion a internet');
                    });
                $.get('/api', { fecha:{$gte:f.format(), $lte:fa.format()}, opcion2:'nouveau', lista:'Salon' })
                    .done(function(data) {
                        myPieChart2.segments[1].value = data.length;
                        myPieChart2.update();
                    })
                    .fail(function() {
                        alert('Se ha producido un fallo, intentelo de nuevo o verifique su conexion a internet');
                    });
                $.get('/api', { fecha:{$gte:f.format(), $lte:fa.format()}, opcion2:'nouveau', lista:'Pub Journal/magazine' })
                    .done(function(data) {
                        myPieChart2.segments[2].value = data.length;
                        myPieChart2.update();
                    })
                    .fail(function() {
                        alert('Se ha producido un fallo, intentelo de nuevo o verifique su conexion a internet');
                    });
                $.get('/api', { fecha:{$gte:f.format(), $lte:fa.format()}, opcion2:'nouveau', lista:'Pub radio' })
                    .done(function(data) {
                        myPieChart2.segments[3].value = data.length;
                        myPieChart2.update();
                    })
                    .fail(function() {
                        alert('Se ha producido un fallo, intentelo de nuevo o verifique su conexion a internet');
                    });
                $.get('/api', { fecha:{$gte:f.format(), $lte:fa.format()}, opcion2:'nouveau', lista:'Affichage dans la rue' })
                    .done(function(data) {
                        myPieChart2.segments[4].value = data.length;
                        myPieChart2.update();
                    })
                    .fail(function() {
                        alert('Se ha producido un fallo, intentelo de nuevo o verifique su conexion a internet');
                    });
                $.get('/api', { fecha:{$gte:f.format(), $lte:fa.format()}, opcion2:'nouveau', lista:'Pub TV' })
                    .done(function(data) {
                        myPieChart2.segments[5].value = data.length;
                        myPieChart2.update();
                    })
                    .fail(function() {
                        alert('Se ha producido un fallo, intentelo de nuevo o verifique su conexion a internet');
                    });
                $.get('/api', { fecha:{$gte:f.format(), $lte:fa.format()}, opcion2:'nouveau', lista:'Internet/Web' })
                    .done(function(data) {
                        myPieChart2.segments[6].value = data.length;
                        myPieChart2.update();
                    })
                    .fail(function() {
                        alert('Se ha producido un fallo, intentelo de nuevo o verifique su conexion a internet');
                    });
                $.get('/api', { fecha:{$gte:f.format(), $lte:fa.format()}, opcion2:'nouveau', lista:'Promo courrier' })
                    .done(function(data) {
                        myPieChart2.segments[7].value = data.length;
                        myPieChart2.update();
                    })
                    .fail(function() {
                        alert('Se ha producido un fallo, intentelo de nuevo o verifique su conexion a internet');
                    });
                $.get('/api', { fecha:{$gte:f.format(), $lte:fa.format()}, opcion2:'nouveau', lista:'Promo email' })
                    .done(function(data) {
                        myPieChart2.segments[8].value = data.length;
                        myPieChart2.update();
                    })
                    .fail(function() {
                        alert('Se ha producido un fallo, intentelo de nuevo o verifique su conexion a internet');
                    });
                $.get('/api', { fecha:{$gte:f.format(), $lte:fa.format()}, opcion2:'nouveau', lista:'Presse' })
                    .done(function(data) {
                        myPieChart2.segments[9].value = data.length;
                        myPieChart2.update();
                    })
                    .fail(function() {
                        alert('Se ha producido un fallo, intentelo de nuevo o verifique su conexion a internet');
                    });
                $.get('/api', { fecha:{$gte:f.format(), $lte:fa.format()}, opcion2:'nouveau', lista:'Visite spontanée' })
                    .done(function(data) {
                        myPieChart2.segments[10].value = data.length;
                        myPieChart2.update();
                    })
                    .fail(function() {
                        alert('Se ha producido un fallo, intentelo de nuevo o verifique su conexion a internet');
                    });
                $.get('/api', { fecha:{$gte:f.format(), $lte:fa.format()}, opcion2:'nouveau', lista:'Recommandation PRO' })
                    .done(function(data) {
                        myPieChart2.segments[11].value = data.length;
                        myPieChart2.update();
                    })
                    .fail(function() {
                        alert('Se ha producido un fallo, intentelo de nuevo o verifique su conexion a internet');
                    });
            };

            function grafica5() {
                var f = moment(f1.format('YYYY-MM-DD'));
                var fa = moment(f2.format('YYYY-MM-DD'));
                $.get('/api', { fecha:{$gte:f.format(), $lte:fa.format()}, opcion2:'cliente habituel', lista:'Récupération commande' })
                    .done(function(data) {
                        myPieChart3.segments[0].value = data.length;
                        myPieChart3.update();
                    })
                    .fail(function() {
                        alert('Se ha producido un fallo, intentelo de nuevo o verifique su conexion a internet');
                    });
                $.get('/api', { fecha:{$gte:f.format(), $lte:fa.format()}, opcion2:'cliente habituel', lista:'Prise commande' })
                    .done(function(data) {
                        myPieChart3.segments[1].value = data.length;
                        myPieChart3.update();
                    })
                    .fail(function() {
                        alert('Se ha producido un fallo, intentelo de nuevo o verifique su conexion a internet');
                    });
                $.get('/api', { fecha:{$gte:f.format(), $lte:fa.format()}, opcion2:'cliente habituel', lista:'Demande de prix et infos' })
                    .done(function(data) {
                        myPieChart3.segments[2].value = data.length;
                        myPieChart3.update();
                    })
                    .fail(function() {
                        alert('Se ha producido un fallo, intentelo de nuevo o verifique su conexion a internet');
                    });
                $.get('/api', { fecha:{$gte:f.format(), $lte:fa.format()}, opcion2:'cliente habituel', lista:'Visite avec clients particuliers' })
                    .done(function(data) {
                        myPieChart3.segments[3].value = data.length;
                        myPieChart3.update();
                    })
                    .fail(function() {
                        alert('Se ha producido un fallo, intentelo de nuevo o verifique su conexion a internet');
                    });
                $.get('/api', { fecha:{$gte:f.format(), $lte:fa.format()}, opcion2:'cliente habituel', lista:'Visite agence/équipe' })
                    .done(function(data) {
                        myPieChart3.segments[4].value = data.length;
                        myPieChart3.update();
                    })
                    .fail(function() {
                        alert('Se ha producido un fallo, intentelo de nuevo o verifique su conexion a internet');
                    });
                $.get('/api', { fecha:{$gte:f.format(), $lte:fa.format()}, opcion2:'cliente habituel', lista:'Promo courrier' })
                    .done(function(data) {
                        myPieChart3.segments[5].value = data.length;
                        myPieChart3.update();
                    })
                    .fail(function() {
                        alert('Se ha producido un fallo, intentelo de nuevo o verifique su conexion a internet');
                    });
                $.get('/api', { fecha:{$gte:f.format(), $lte:fa.format()}, opcion2:'cliente habituel', lista:'Promo email' })
                    .done(function(data) {
                        myPieChart3.segments[6].value = data.length;
                        myPieChart3.update();
                    })
                    .fail(function() {
                        alert('Se ha producido un fallo, intentelo de nuevo o verifique su conexion a internet');
                    });
            };

        } else {
            console.log('Tienes que selecionar 2 fechas');
        }
    };

    var dataChart1 = {
        labels:[], datasets:[{
            label: "Clientes",
            fillColor: "rgba(108, 29, 69, 0.7)",
            strokeColor: "rgba(0, 0, 0, 0.6)",
            highlightFill: "rgba(220,220,220,0.75)",
            highlightStroke: "rgba(220,220,220,1)",
            data: []
        }]};
    var ctx1 = document.getElementById("myChart1").getContext("2d");
    var myBarChart1 = new Chart(ctx1).Bar(dataChart1);

    var dataChart2 = {
        labels:[], datasets:[{
            label: "PRO",
            fillColor: "#d12727",
            strokeColor: "#000000",
            highlightFill: "#ffffff",
            highlightStroke: "#ffffff",
            data: []
            },{
            label: "Particuler",
            fillColor: "#d12727",
            strokeColor: "#000000",
            highlightFill: "#ffffff",
            highlightStroke: "#ffffff",
            data: []
        }]};
    var ctx2 = $("#myChart2").get(0).getContext("2d");
    var myBarChart2 = new Chart(ctx2).Bar(dataChart2);

    var dataChart3 = [{
            value: 0,
            color: "#433ab7",
            highlight: "#8f89d8",
            label: "Nouveau"
        },{
            value: 0,
            color: "#b93b3b",
            highlight: "#de8c8c",
            label: "Cliente Habituel"
        }];
    var ctx3 = $("#myChart3").get(0).getContext("2d");
    var myPieChart1 = new Chart(ctx3).Pie(dataChart3);

    var dataChart4 = [{
            value: 0,
            color: "#b73a3a",
            highlight: "#d38c8c",
            label: "Bouche á oreille"
        },{
            value: 0,
            color: "#b73aad",
            highlight: "#d897d3",
            label: "Salon"
        },{
            value: 0,
            color: "#433ab7",
            highlight: "#a3a0d4",
            label: "Pub Journal/magazine"
        },{
            value: 0,
            color: "#3aadb7",
            highlight: "#9dd3d8",
            label: "Pub radio"
        },{
            value: 0,
            color: "#3ab73a",
            highlight: "#97d397",
            label: "Affichage dans la rue"
        },{
            value: 0,
            color: "#b2b73a",
            highlight: "#ccce93",
            label: "Pub TV"
        },{
            value: 0,
            color: "#b7783a",
            highlight: "#d3b699",
            label: "Internet/Web"
        },{
            value: 0,
            color: "#3ab76a",
            highlight: "#9ed1b2",
            label: "Promo courrier"
        },{
            value: 0,
            color: "#873ab7",
            highlight: "#bd9cd1",
            label: "Promo email"
        },{
            value: 0,
            color: "#82b73a",
            highlight: "#bad09c",
            label: "Presse"
        },{
            value: 0,
            color: "#3a82b7",
            highlight: "#9dbcd3",
            label: "Visite spontanée"
        },{
            value: 0,
            color: "#b7ad3a",
            highlight: "#d3cfa5",
            label: "Recommandation PRO"
        }];
    var ctx4 = $("#myChart4").get(0).getContext("2d");
    var myPieChart2 = new Chart(ctx4).Pie(dataChart4);

    var dataChart5 = [{
            value: 0,
            color: "#b73a3a",
            highlight: "#c49090",
            label: "Récupération commande"
        },{
            value: 0,
            color: "#b73aad",
            highlight: "#c394bf",
            label: "Prise commande"
        },{
            value: 0,
            color: "#3a3ab7",
            highlight: "#9090be",
            label: "Demande de prix et infos"
        },{
            value: 0,
            color: "#3ab7a4",
            highlight: "#93c3bb",
            label: "Visite avec clients particuliers"
        },{
            value: 0,
            color: "#3ab73a",
            highlight: "#9ec69e",
            label: "Visite agence/équipe"
        },{
            value: 0,
            color: "#adb73a",
            highlight: "#babe92",
            label: "Promo courrier"
        },{
            value: 0,
            color: "#b76f3a",
            highlight: "#c3a996",
            label: "Promo email"
        }];
    var ctx5 = $("#myChart5").get(0).getContext("2d");
    var myPieChart3 = new Chart(ctx5).Pie(dataChart5);


    Chart.defaults.global = {
        responsive: true
    }

});
