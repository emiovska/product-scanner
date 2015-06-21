/**
 * Created by ElenaM on 17.05.2015.
 */
app.factory('D2RService', function ($http,$q) {

  var endpoint="http://192.168.0.12:2020";
  return {
    getProductInfo: function(barcode){
     var deferred = $q.defer();
         $http({
            url: endpoint+'/sparql?query='+encodeURIComponent(
                  'PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>'+
                  'PREFIX owl: <http://www.w3.org/2002/07/owl#>'+
                  'PREFIX xsd: <http://www.w3.org/2001/XMLSchema#>'+
                  'PREFIX vocab: <http://localhost:2020/vocab/resource/>'+
                  'PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>'+
                  'PREFIX map: <file:/C:/Users/Marija/Desktop/d2r-server-0.7/d2r-server-0.7/mapping-productdb.ttl#>'+
                  'PREFIX db: <http://localhost:2020/resource/>'+
                  'SELECT DISTINCT ?brandName ?brandUrl ?ownerName ?wikiLink WHERE {'+
                    '?gtin rdf:type vocab:gtin.' +
                    '?gtin vocab:gtin_GTIN_CD \"'+barcode+ '\".'+
                    '?gtin vocab:gtin_BSIN ?code.'+
                    '?brand vocab:brand_BSIN ?code.'+
                    '?brand vocab:brand_BRAND_NM ?brandName.' +
                    '?brand vocab:brand_BRAND_LINK ?brandUrl.' +
                    '?brandOwnerBsin rdf:type vocab:brand_owner_bsin.'+
                    '?brandOwnerBsin vocab:brand_owner_bsin_BSIN ?code.'+
                    '?brandOwnerBsin vocab:brand_owner_bsin_OWNER_CD ?ownerCd.'+
                    '?brandOwner rdf:type vocab:brand_owner.' +
                    '?brandOwner vocab:brand_owner_OWNER_CD ?ownerCd.'+
                    '?brandOwner vocab:brand_owner_OWNER_NM ?ownerName.'+
                    '?brandOwner vocab:brand_owner_OWNER_WIKI_EN ?wikiLink.'+
                  '}'),
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
