package main
import "fmt"

func main(){
	for i := 0; i < 5; i++ {
			fmt.Println(i) // 0 1 2 3 4が出力される
	}

	color1 := []string{"赤","黄","青"}
	for i := 0; i < len(color1); i++ {
		fmt.Println(color1[i]) // 赤 黄 青が出力される
	}
}