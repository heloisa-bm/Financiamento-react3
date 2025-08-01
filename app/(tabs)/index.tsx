import React, { useState } from "react";
import { Text, View, Button, StyleSheet, TextInput } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-around",
    alignItems: "center",
    backgroundColor: "#efefef",
    padding: 20,
  },
  title: {
    fontSize: 26,
    color: "#AA2200",
    fontWeight: "bold",
  },
  text: {
    fontSize: 20,
    color: "#121212",
    textAlign: "center"
  },
  input: {
    width: "80%",
    borderColor: "#000",
    borderWidth: 1,
    padding: 10,
    borderRadius: 5,
    backgroundColor: "#fff",
    marginBottom: 10
  }
});

export default function Index(): JSX.Element {
  const [valorBem, setValorBem] = useState<string>("");
  const [parcelas, setParcelas] = useState<string>("");
  const [jurosMensal, setJurosMensal] = useState<string>("");
  const [taxasAdicionais, setTaxasAdicionais] = useState<string>("");
  const [resultado, setResultado] = useState<string>("");

  const calcularFinanciamento = (): void => {
    const c = parseFloat(valorBem.replace(",", ".")); // capital
    const t = parseInt(parcelas); // número de parcelas
    const i = parseFloat(jurosMensal.replace(",", ".")) / 100; // juros mensal em decimal
    const taxas = parseFloat(taxasAdicionais.replace(",", ".")) || 0;

    if (isNaN(c) || isNaN(t) || isNaN(i) || t === 0) {
      setResultado("Preencha todos os campos corretamente.");
      return;
    }

    const m = c * Math.pow(1 + i, t) + taxas;
    const p = m / t;

    setResultado(`Parcela: R$ ${p.toFixed(2)}\nMontante Total: R$ ${m.toFixed(2)}`);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Simulador de Financiamento</Text>

      <TextInput
        placeholder="Valor do bem (R$)"
        style={styles.input}
        keyboardType="numeric"
        value={valorBem}
        onChangeText={setValorBem}
      />
      <TextInput
        placeholder="Número de parcelas"
        style={styles.input}
        keyboardType="numeric"
        value={parcelas}
        onChangeText={setParcelas}
      />
      <TextInput
        placeholder="Taxa de juros mensal (%)"
        style={styles.input}
        keyboardType="numeric"
        value={jurosMensal}
        onChangeText={setJurosMensal}
      />
      <TextInput
        placeholder="Taxas adicionais (R$)"
        style={styles.input}
        keyboardType="numeric"
        value={taxasAdicionais}
        onChangeText={setTaxasAdicionais}
      />

      <Button title="Calcular" onPress={calcularFinanciamento} />
      <Text style={styles.text}>{resultado}</Text>
    </View>
  );
}
