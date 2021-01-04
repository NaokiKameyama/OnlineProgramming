package main
import "fmt"

func main(){
	color1 := []string{"赤","黄","青"}

	for a, b := range color1{
		fmt.Println(a,b) //0 赤 1 黄 2 青が出力される
	}

	for _, b := range color1{
		fmt.Println(b) //赤 黄 青が出力される
	}
}