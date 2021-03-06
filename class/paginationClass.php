<?php
class PerPage {
    public $perpage;

    function __construct() {
        $this->perpage = 5;
    }

    function getAllPageLinks($count,$href) {
        $output = '<div id="pagination-list">';
        if(!isset($_GET["page"])) $_GET["page"] = 1;
        if($this->perpage != 0)
            $pages  = ceil($count/$this->perpage);
        if($pages>1) {
            if($_GET["page"] == 1)
                $output = $output . '<span class="link first disabled">&#8810;</span><span class="link disabled">&#60;</span>';
            else
                $output = $output . '<a class="link first" onclick="getPagination(\'' . $href . (1) . '\')" >&#8810;</a><a class="link" onclick="getPagination(\'' . $href . ($_GET["page"]-1) . '\')" >&#60;</a>';


            if(($_GET["page"]-3)>0) {
                if($_GET["page"] == 1)
                    $output = $output . '<span id=1 class="link" name="current">1</span>';
                else
                    $output = $output . '<a class="link" onclick="getPagination(\'' . $href . '1\')" >1</a>';
            }
            if(($_GET["page"]-3)>1) {
                $output = $output . '<span class="dot">...</span>';
            }

            for($i=($_GET["page"]-2); $i<=($_GET["page"]+2); $i++)	{
                if($i<1) continue;
                if($i>$pages) break;
                if($_GET["page"] == $i)
                    $output = $output . '<span id='.$i.' class="link" name="current">'.$i.'</span>';
                else
                    $output = $output . '<a class="link" onclick="getPagination(\'' . $href . $i . '\')" >'.$i.'</a>';
            }

            if(($pages-($_GET["page"]+2))>1) {
                $output = $output . '<span class="dot">...</span>';
            }
            if(($pages-($_GET["page"]+2))>0) {
                if($_GET["page"] == $pages)
                    $output = $output . '<span id=' . ($pages) .' class="link" name="current">' . ($pages) .'</span>';
                else
                    $output = $output . '<a class="link" onclick="getPagination(\'' . $href .  ($pages) .'\')" >' . ($pages) .'</a>';
            }

            if($_GET["page"] < $pages)
                $output = $output . '<a  class="link" onclick="getPagination(\'' . $href . ($_GET["page"]+1) . '\')" >></a><a  class="link" onclick="getPagination(\'' . $href . ($pages) . '\')" >&#8811;</a>';
            else
                $output = $output . '<span class="link disabled">></span><span class="link disabled">&#8811;</span>';


        }
        return $output .'</div>';
    }
}
?>