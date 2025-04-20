<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Report;
use Illuminate\Database\QueryException;

class ReportController extends Controller
{
    function addReport(Request $req){
        try {
            $report = new Report;
            $report->report_title = $req->input('report_title');
            $report->category = $req->input('category');
            $report->report_descr = $req->input('report_descr');
            $report->report = $req->input('report');
            $report->save();
            return $report;
        } catch (QueryException $e) {
            if (strpos($e->getMessage(), 'Data too long for column') !== false) {
                return response()->json(['error' => 'Data is too long for one or more fields.'], 422);
            }
            return response()->json(['error' => 'Database error occurred.'], 500);
        }
    }

    function list(){
        return Report::all();
    }

    function delete($id){
        $result= Report::where('id',$id)->delete();
        if($result){
            return["result"=>"Product has been deleted"];
        } else {
            return ["result"=>"Operation failed"];
        }
    }

    function getReport($id){
        return Report::find($id);
    }

    function updateReport(Request $req, $id){
        try {
            $report = Report::find($id);

            if (!$report) {
                return response()->json(['message' => 'Report not found'], 404);
            }

            $report->report_title = $req->input('report_title');
            $report->category = $req->input('category');
            $report->report_descr = $req->input('report_descr');
            $report->report = $req->input('report');
            $report->save();

            return $report;

        } catch (QueryException $e) {
            if (strpos($e->getMessage(), 'Data too long for column') !== false) {
                return response()->json(['error' => 'Data is too long for one or more fields.'], 422);
            }
            return response()->json(['error' => 'Database error occurred.'], 500);
        }
    }

    function search($key){
        return Report::where('report_title','Like',"%$key%")->get();
    }
}
