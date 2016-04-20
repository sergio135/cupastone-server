Aplicaccion web para estadisticas cuestionarios Cupa Stone

Tiene un formulario al inicio que mete unas cookies de usuario para poder entrar.
Solo funciona con un usuario y contraseña ya que estan a pelo en el codigo.

La base de datos es MongoDB, con mongoose.

Posee una api con un CRUD casi compreto, y busquedas por parametros.

Para las graficas se uso chart.js, pero ahora mismo tiene una version que acaba de quedar desfasada, y ademas la nueva version tampoco se la ve muy preparada para los update o graficas en tiempo real. Ciertamente creo que fue un erro esta eleccion, para proximas version deberiamos cambiarlo por "highcharts.js"