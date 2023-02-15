# CBill-Frontend
> CBill-Frontend is the `frontend`  of the `WebApp` we made for a courier company we worked as `part timers`!

<br/>

![](https://camo.githubusercontent.com/ab4c3c731a174a63df861f7b118d6c8a6c52040a021a552628db877bd518fe84/68747470733a2f2f696d672e736869656c64732e696f2f62616467652f72656163742d2532333230323332612e7376673f7374796c653d666f722d7468652d6261646765266c6f676f3d7265616374266c6f676f436f6c6f723d253233363144414642)

### Various `components` involved in this app are,

- `Dashboard`

  ![](https://github.com/HLrahul/Cbill-frontend/blob/main/Images%20of%20CB/Dashboard.png)
  
  > This Dashboard component consist of the `search box` for `tracking down` the courier status.
  >
  > The courier status consists of the following details
    - Where the courier is `Origin`ated From?
    - Where the courier has `current`ly reached?
    - Has the courier reached its `destination` or not?
    - When the courier reached the specific branch? ( `date` and `time` )
    - How the courier reached the specific branch? ( by `road` / `train` / `air` etc... )
    
<Hr>
  
- `Cash`

  ![](https://github.com/HLrahul/Cbill-frontend/blob/main/Images%20of%20CB/Cash.png)
  
  > The Cash component allows us to `book` couriers based on cash paying clients!
  >
  > The `input` fields are helpful in `filling` in the `repetetive` details like `from`, `courier number`, `phone` etc...
  
<Hr>
  
- `CashTiles`

  ![](https://github.com/HLrahul/Cbill-frontend/blob/main/Images%20of%20CB/Cash%20Tiles.png)
  
  > Cash Tiles are the actual forms that are to be filled to `book` the details of the courier.
  >
  > The repetetive details are already filled in every tiles and each tile has it's own `state`.
  >
  > There are various `interactions` that can be made with the tiles
    - `Add` a new tile.
    - `Delete` a tile.
  
<Hr>
  
- `Credit`

  ![](https://github.com/HLrahul/Cbill-frontend/blob/main/Images%20of%20CB/Credit.png)
  
  > The Credit component allows to have a look through the `credit clients` of the company.
  >
  > Every credit client of the company are listed in `sorted` order and `search` bar allows us to search clients on the go.
  >
  > Once we click on a specific credit company tile, we will be redirected to the `partyBook` component.
  
<Hr>
  
- `PartyBook`

  ![](https://github.com/HLrahul/Cbill-frontend/blob/main/Images%20of%20CB/PartyBook.png)
  
  > The partyBook component consist of various other components, namely
    - `Frequent Parties`
    
      > Lists the frequent parties of the specific credit clien.
    - `Booked couriers`
    
      > Lists the already booked couriers of the specific credit client.
    - `PartyPage`
    
      > Allows to book couriers the same way we do in the cash compoenent.
      
<Hr>
  
- `Records`

  ![](https://github.com/HLrahul/Cbill-frontend/blob/main/Images%20of%20CB/Records.png)
  
  > Every booked courier details are listed in the records component
  >
  > This allows has been implemented with the `Infinite Scroll` methodology to load `additional records` with every scroll.
  >
  > Various functionalities with records are,
    - `Edit` on the go.
    - `Delete` with confirmation `popup`.
 
<Hr>
  
- `Editable Records`

  ![](https://github.com/HLrahul/Cbill-frontend/blob/main/Images%20of%20CB/Editable%20Record.png)
  
  > Edit the records `on the go` without much effort and efficiently as well.
