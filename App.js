import {StyleSheet, Text, View, TextInput, ScrollView, TouchableOpacity, Linking, Platform, KeyboardAvoidingView} from 'react-native';
import React, {useState, useEffect, useRef} from 'react';
import theme from "./theme";
import AkademikIcons from "./components/AkademikIcons";
import {FontAwesome5, FontAwesome6} from "@expo/vector-icons";


export default function App({navigation}) {
  const [searchTerm, setSearchTerm] = useState("");
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const scrollViewRef = useRef(null);

  


  const scrollToTop = () => {
    scrollViewRef.current?.scrollTo({ y: 0, animated: true });
  };

  useEffect(() => {
    if (searchTerm.length >= 3) {
      setLoading(true);
      fetch(`https://web.usak.edu.tr/api/websites?ara=${searchTerm}`)
        .then(response => response.json())
        .then(json => {
          setData(json.data || []);
          setLoading(false);
        })
        .catch(error => {
          console.error(error);
          setLoading(false);
        });
    } else {
      setData([]);
    }
  }, [searchTerm]);

  
  
  const Card = ({ item }) => (
    <View style={styles.card}>
      <Text style={styles.title}>{item.name}</Text>
  
      {item.description ? (
        <Text style={styles.department}>
           {item.parent_name ? <Text>{item.parent_name} /</Text> : null} {item.description} 
        </Text>
      ) : null}
  
      <View style={styles.divider} />
  
      {item.url ? (
        <View style={styles.urlContainer}>
        <TouchableOpacity 
          onPress={() => {
            const formattedUrl = item.url.startsWith("http") ? item.url : `https://${item.url}`;
            Linking.openURL(formattedUrl);
          }}
        >
          <Text style={styles.urlText}>
            <FontAwesome6 name="link" /> {item.url.startsWith("http") ? item.url : `https://${item.url}`}
          </Text>
        </TouchableOpacity>
      
            
          
            {item.login ? ( <TouchableOpacity onPress={() => Linking.openURL(item.login)}>
              <Text style={styles.urlText}>
              <AkademikIcons name={"kimlik"} style={styles.urlText}/> Hızlı Giriş </Text>
            </TouchableOpacity> 
          ) : null}
        </View>
      ) : null}
    </View>
  );

  return (
    <KeyboardAvoidingView
    behavior={Platform.OS == 'ios' ? 'padding' : ''}
    style={styles.container}>
    <ScrollView ref={scrollViewRef} style={styles.scrollViewContainer} contentContainerStyle={{alignItems: 'center'}}>
        <View style={styles.searchBox}>
            <View style={styles.baslik}>
                <Text style={styles.titleText}>Uşak Üniversitesi İnternet Sayfası Rehberi</Text>
            </View>
            <TextInput
                style={[styles.input, isFocused && styles.inputFocused]}
                placeholder="Arama yapmak için en az 3 harf yazınız."
                value={searchTerm}
                onChangeText={setSearchTerm}
                onFocus={() => setIsFocused(true)}
                onBlur={() => setIsFocused(false)}
            />
            <Text style={styles.noteText}>Not: Aramak için sayfa adresi, sayfa ismi veya birim ismi yazabilirsiniz.</Text>
        </View>
        <View style={styles.searchResults}>
            {loading ? (
                <View style={styles.messageContainer}>
                    <Text style={styles.resultText}>Yükleniyor...</Text>
                </View>
            ) : data.length > 0 ? (data.map((item, index) => (
                    <Card key={index} item={item}/>
                ))
            ) : (
                <View style={styles.messageContainer}>
                    <Text style={styles.resultText}>
                        {searchTerm.length >= 3 ?
                            <Text style={styles.noResultsText}>Sonuç bulunamadı.</Text> :
                            "Arama yapmak için yukarıya en az 3 harf yazınız."
                        }
                    </Text>
                </View>
            )}
        </View>


        <Text style={styles.locationText}
              selectable={true}
        >Ankara İzmir Yolu 8.Km Bir Eylül Kampüsü, Merkez / UŞAK</Text>
        <Text style={styles.copyrightText}>&copy; 2025 - Bilgi İşlem Daire Başkanlığı</Text>

    </ScrollView>
    <TouchableOpacity style={styles.scrollTopButton} onPress={scrollToTop}>
        <Text style={styles.scrollTopText}><FontAwesome6 name="angle-up" size={24} color="white"/></Text>
    </TouchableOpacity>
    
    
</KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    position: "relative",
    backgroundColor: theme.colors.koyuKirmizi,
    flex: 1,
    alignSelf: 'stretch',
    margin: 0,
    padding: 0
},
scrollViewContainer: {
  position: "relative",
  backgroundColor: theme.colors.koyuKirmizi,
  flex: 1,
  alignSelf: 'stretch',
  margin: 0,
  padding: 10
},
searchBox: {
  flex: 1,
  alignSelf:'stretch',
  backgroundColor:
  theme.colors.beyaz,
  borderRadius:10,
  marginTop:5,
  margin:0,
  padding:20,
  alignItems:'center',
  justifyContent:'center',
},
  titleText: {
    textAlign: 'center',
    fontFamily: 'Oxygen',
    fontSize: 16,
    color: theme.colors.koyuMavi,
  },
  input: {
    alignSelf: 'stretch',
    borderColor:
    theme.colors.acikGri,
    borderWidth: 1,
    borderRadius: 10,
    marginTop: 15,
    padding: 15,
    fontSize: 16,
    textAlign: 'center',
    fontFamily: "Oxygen",
    backgroundColor:
    theme.colors.beyaz,
},
  inputFocused: {
    borderColor: 'lightblue',
    borderWidth: 3,
    shadowColor: 'lightblue',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.5,
    shadowRadius: 8,
    elevation: 10,
    padding: 13,
  },
  noteText: {
    fontSize: 14,
    color: theme.colors.koyuGri,
    marginTop: 20,
    textAlign: 'center',
    fontFamily:"Oxygen",
  },
  searchResults: {
    alignSelf: 'stretch',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
},
messageContainer: {
  marginTop: 10,
  alignSelf: "stretch",
  backgroundColor:
  theme.colors.beyaz,
  borderRadius: 10,
  paddingVertical: 15,
  paddingHorizontal: 10,
},
  resultText: {
    fontSize: 14,
    color: theme.colors.koyuGri,
    textAlign: 'center',
    fontFamily:"Oxygen",
  },
  noResultsText: {
    color: theme.colors.acikKirmizi,
    fontFamily:"Oxygen",
  },
 card: {
  alignSelf: "stretch",
  backgroundColor:
  theme.colors.beyaz,
  marginTop: 10,
  borderRadius: 10,
  padding: 15,
},
  title: {
    fontSize: 16,
    fontFamily:"Oxygen-Bold",
    color: theme.colors.koyuGri,
  },
  department: {
    fontSize: 14,
    color: theme.colors.koyuGri,
    fontFamily:"Oxygen",
  },
  urlContainer: {
    flexDirection: 'row',   
    justifyContent: 'space-between', 
    alignItems: 'center',   
    marginTop: 0,         
  },
  urlText: {
    fontSize: 12,
    color: theme.colors.acikMavi,  
    fontFamily:"Oxygen",
  },
 divider: {
  height: 1,
  backgroundColor:
  theme.colors.acikGri,
  alignSelf: 'stretch',
  marginVertical: 10,
  alignItems: 'center',
  justifyContent: 'center',
},
scrollTopButton: {
  position: 'absolute',
  bottom: 5,
  right: 5,
  backgroundColor: "rgba(0, 0, 0, 0.3)",
  borderRadius: 10,
  width: 55,
  height: 55,
  justifyContent: 'center',
  alignItems: 'center',
},
  scrollTopText: {
    color: theme.colors.beyaz,
    fontSize: 28,
    fontWeight: '400',
    textAlign: 'center',
  },
  locationText:{
    fontFamily: 'Oxygen',
    textAlign: 'center',
    paddingTop: 20,
    paddingBottom: 10,
    color: theme.colors.beyaz
  },
  copyrightText:{
    fontFamily: 'Oxygen',
    color: theme.colors.beyaz,
    paddingBottom: 20
  }, 
});