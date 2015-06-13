/**
 * Created by ElenaM on 17.05.2015.
 */
app.factory('D2RService', function ($http,$q) {


  return {
    getProductInfo: function(barcode){
     var deferred = $q.defer();
         $http({
            url: 'http://192.168.0.103:2020/sparql?query=PREFIX%20rdf%3A%20<http%3A%2F%2Fwww.w3.org%2F1999%2F02%2F22-rdf-syntax-ns%23>%20PREFIX%20owl%3A%20<http%3A%2F%2Fwww.w3.org%2F2002%2F07%2Fowl%23>%20PREFIX%20xsd%3A%20<http%3A%2F%2Fwww.w3.org%2F2001%2FXMLSchema%23>%20PREFIX%20vocab%3A%20<http%3A%2F%2Flocalhost%3A2020%2Fvocab%2Fresource%2F>%20PREFIX%20rdfs%3A%20<http%3A%2F%2Fwww.w3.org%2F2000%2F01%2Frdf-schema%23>%20PREFIX%20map%3A%20<file%3A%2FC%3A%2FUsers%2FMarija%2FDesktop%2Fd2r-server-0.7%2Fd2r-server-0.7%2Fmapping-productdb.ttl%23>%20PREFIX%20db%3A%20<http%3A%2F%2Flocalhost%3A2020%2Fresource%2F>%20SELECT%20DISTINCT%20?brandName%20?brandUrl%20?ownerName%20?wikiLink%20WHERE%20{%20?gtin%20rdf%3Atype%20vocab%3Agtin.%20?gtin%20vocab%3Agtin_GTIN_CD%20\"' + barcode + '\".%20?gtin%20vocab%3Agtin_BSIN%20?code.%20?brand%20vocab%3Abrand_BSIN%20?code.%20?brand%20vocab%3Abrand_BRAND_NM%20?brandName.%20?brand%20vocab%3Abrand_BRAND_LINK%20?brandUrl.%20?brandOwnerBsin%20rdf%3Atype%20vocab%3Abrand_owner_bsin.%20?brandOwnerBsin%20vocab%3Abrand_owner_bsin_BSIN%20?code.%20?brandOwnerBsin%20vocab%3Abrand_owner_bsin_OWNER_CD%20?ownerCd.%20?brandOwner%20rdf%3Atype%20vocab%3Abrand_owner.%20?brandOwner%20vocab%3Abrand_owner_OWNER_CD%20?ownerCd.%20?brandOwner%20vocab%3Abrand_owner_OWNER_NM%20?ownerName.%20?brandOwner%20vocab%3Abrand_owner_OWNER_WIKI_EN%20?wikiLink.%20}%20LIMIT%2010',
            method: 'GET'
            }).success(function(data){
              var json = $.xml2json(data);
              deferred.resolve(data);
            }).error(function(error){
             deferred.reject(error);
            });

        return deferred.promise;
    }

  }

});
