del *.sgz
COPY ..\*.svg
c:\bin\gzip *.svg 
ren *.svg.gz *.svgz